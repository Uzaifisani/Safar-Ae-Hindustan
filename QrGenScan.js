<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>QR Code Generator and Verifier</title>
    <script src="https://cdn.jsdelivr.net/npm/jsqr/dist/jsQR.js"></script>
</head>

<body>
    <div>
        <h2>Your QR Code:</h2>
        <img id="qrCodeImage" src="" alt="QR Code">
        <a id="downloadLink" href="#" download="qrcode.png">Download QR Code</a>
    </div>

    <div>
        <h2>Scan and Verify QR Code:</h2>
        <video id="video" width="300" height="300" style="border: 1px solid black;"></video>
        <canvas id="canvas" hidden></canvas>
        <p id="output"></p>
    </div>

    <script>
        function combineParameters(Uid, Pid, Eid, Date, RandomNumber) {
            const specialChars = ['#', '@', '$', '%', '*', '^', '\\', '/'];

            function getRandomChar() {
                return specialChars[Math.floor(Math.random() * specialChars.length)];
            }

            const combinedString = `${Uid}${getRandomChar()}${Pid}${getRandomChar()}${Eid}${getRandomChar()}${Date.replace(/-/g, '')}${getRandomChar()}${RandomNumber}`;

            return combinedString;
        }

        const result = combineParameters(257, '012', 347, '28-08-2024', 7598);
        console.log(result);

        function generateQRCode(data) {
            const apiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(data)}`;

            fetch(apiUrl)
                .then(response => {
                    if (response.ok) {
                        return response.blob();
                    } else {
                        throw new Error('Failed to generate QR code');
                    }
                })
                .then(blob => {
                    const qrCodeUrl = URL.createObjectURL(blob);
                    const imgElement = document.getElementById('qrCodeImage');
                    imgElement.src = qrCodeUrl;

                    // Set the download link
                    const downloadLink = document.getElementById('downloadLink');
                    downloadLink.href = qrCodeUrl;
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }

        function startVideo() {
            navigator.mediaDevices.getUserMedia({
                    video: {
                        facingMode: "environment"
                    }
                })
                .then(function(stream) {
                    video.srcObject = stream;
                    video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
                    video.play();
                    requestAnimationFrame(tick);
                });
        }

        function tick() {
            if (video.readyState === video.HAVE_ENOUGH_DATA) {
                canvasElement.hidden = false;
                canvasElement.height = video.videoHeight;
                canvasElement.width = video.videoWidth;
                canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
                const imageData = canvas.getImageData(0, 0, canvasElement.width, canvasElement.height);
                const code = jsQR(imageData.data, imageData.width, imageData.height, {
                    inversionAttempts: "dontInvert",
                });

                if (code) {
                    output.textContent = `QR Code Data: ${code.data}`;
                    if (code.data === result) {
                        alert("QR Code Verified Successfully!");
                    } else {
                        alert("QR Code Verification Failed!");
                    }
                }
            }
            requestAnimationFrame(tick);
        }

        // Start the QR code generation
        generateQRCode(result);

        // Initialize video for scanning
        const video = document.getElementById('video');
        const canvasElement = document.getElementById('canvas');
        const canvas = canvasElement.getContext('2d');
        const output = document.getElementById('output');
        startVideo();
    </script>
</body>

</html>
""" # Save the code into an HTML file file_path = "/mnt/data/qr_generator_and_scanner.html" with open(file_path, "w") as file: file.write(qr_code_file_content) file_path
