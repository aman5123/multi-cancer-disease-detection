document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle Logic
    const themeSwitch = document.getElementById('theme-switch');
    const currentTheme = localStorage.getItem('theme');
    
    if (currentTheme) {
        document.body.classList.add(currentTheme);
        if (currentTheme === 'light-theme' && themeSwitch) {
            themeSwitch.checked = true;
        }
    }
    
    if (themeSwitch) {
        themeSwitch.addEventListener('change', function(e) {
            if (e.target.checked) {
                document.body.classList.add('light-theme');
                localStorage.setItem('theme', 'light-theme');
            } else {
                document.body.classList.remove('light-theme');
                localStorage.setItem('theme', 'dark-theme');
            }
        });
    }

    // Modal logic handle
    const modal = document.getElementById('upload-modal');
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // Handle generic upload and preview mechanisms for all forms
    document.querySelectorAll('.inference-form').forEach(form => {
        const dropArea = form.querySelector('.drop-area');
        const fileInput = form.querySelector('.file-input');
        const browseBtn = form.querySelector('.btn-browse');
        const previewContainer = form.querySelector('.preview-container');
        const imagePreview = form.querySelector('.image-preview');
        const resultBox = form.parentElement.querySelector('.result-box');

        if (!dropArea || !fileInput) return; // safeguard

        dropArea.addEventListener('click', (e) => {
            if(e.target.tagName !== 'BUTTON') {
                fileInput.click();
            }
        });
        
        if (browseBtn) {
            browseBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                fileInput.click();
            });
        }

        dropArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropArea.style.borderColor = '#818cf8';
            dropArea.style.background = 'rgba(129, 140, 248, 0.05)';
        });

        dropArea.addEventListener('dragleave', () => {
            dropArea.style.borderColor = '';
            dropArea.style.background = '';
        });

        dropArea.addEventListener('drop', (e) => {
            e.preventDefault();
            dropArea.style.borderColor = '';
            dropArea.style.background = '';
            
            if (e.dataTransfer.files.length) {
                fileInput.files = e.dataTransfer.files;
                updatePreview();
            }
        });

        fileInput.addEventListener('change', () => {
            if (fileInput.files.length) {
                updatePreview();
            }
        });

        function updatePreview() {
            const file = fileInput.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    imagePreview.src = e.target.result;
                    previewContainer.classList.remove('hidden');
                    dropArea.classList.add('hidden');
                };
                reader.readAsDataURL(file);
            }
        }

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            if (!fileInput.files.length) {
                alert('Please select an image first.');
                return;
            }

            const formData = new FormData(form);
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Analyzing...';
            submitBtn.disabled = true;

            try {
                const response = await fetch('/api/predict', {
                    method: 'POST',
                    body: formData
                });
                const data = await response.json();

                if (data.status === 'success') {
                    showResult(data.model, data.prediction, data.confidence, resultBox, data);
                } else {
                    alert('Analysis failed. Please try again.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Connection error. Is the backend running?');
            } finally {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    });

    function showResult(modelType, prediction, confidence, resultBox, data) {
        if (!resultBox) return;
        const previewImg = resultBox.closest('.analysis-box').querySelector('.image-preview');
        const previewSrc = previewImg.src;

        resultBox.innerHTML = `
            <div class="result-wrapper" style="margin-top: 2rem; animation: fadeIn 0.5s ease-out;">
                <div class="result-visuals" style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem;">
                    <div class="visual-card" style="position: relative; border-radius: 12px; overflow: hidden; border: 2px solid rgba(255,255,255,0.1); box-shadow: 0 4px 15px rgba(0,0,0,0.3);">
                        <p style="position: absolute; top: 8px; left: 8px; z-index: 10; background: rgba(0,0,0,0.7); padding: 4px 8px; border-radius: 4px; font-size: 10px; font-weight: bold; color: #fff; letter-spacing: 1px;">GRAD-CAM HEATMAP</p>
                        <img src="${previewSrc}" style="width: 100%; display: block;">
                        <img src="${data.heatmap}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0.7; mix-blend-mode: overlay; transition: opacity 0.3s;">
                    </div>
                    <div class="visual-card" style="position: relative; border-radius: 12px; overflow: hidden; border: 2px solid rgba(255,255,255,0.1); box-shadow: 0 4px 15px rgba(0,0,0,0.3);">
                        <p style="position: absolute; top: 8px; left: 8px; z-index: 10; background: rgba(0,0,0,0.7); padding: 4px 8px; border-radius: 4px; font-size: 10px; font-weight: bold; color: #fff; letter-spacing: 1px;">SEGMENTATION MASK</p>
                        <img src="${previewSrc}" style="width: 100%; display: block;">
                        <img src="${data.mask}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; mix-blend-mode: screen;">
                    </div>
                </div>
                
                <div style="padding: 1.5rem; border-radius: 12px; background: rgba(76, 175, 80, 0.1); border: 1px solid rgba(76, 175, 80, 0.4); text-align: center; backdrop-filter: blur(5px);">
                    <p style="color: #4caf50; margin-bottom: 0.8rem; font-size: 1.4rem; font-weight: 800; text-transform: uppercase; letter-spacing: 1px;">
                        <i class="fa-solid fa-circle-check"></i> Analysis Complete
                    </p>
                    <div style="display: flex; flex-direction: column; gap: 0.4rem; color: #fff;">
                        <p>Model Pipeline: <strong style="color: #818cf8;">${modelType.toUpperCase()}</strong></p>
                        <p style="font-size: 1.2rem;">Diagnosis: <strong style="color: #fff; text-transform: capitalize;">${prediction.replace(/[-_]/g, ' ')}</strong></p>
                        <p>Confidence: <strong style="color: #4caf50;">${confidence}</strong></p>
                    </div>
                </div>
            </div>
        `;
        resultBox.classList.remove('hidden');
        resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
});
