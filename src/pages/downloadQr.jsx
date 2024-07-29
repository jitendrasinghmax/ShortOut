import { Button } from '@/components/ui/button';
import React, { useRef } from 'react';
import QRCode from "react-qr-code";

export const QRCodeDownload = ({ url }) => {
    const qrCodeRef = useRef(null)

    const handleDownload = () => {
        const svg = qrCodeRef.current.querySelector('svg');
        const svgData = new XMLSerializer().serializeToString(svg);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();

        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            const pngFile = canvas.toDataURL('image/png');
            const downloadLink = document.createElement('a');
            downloadLink.href = pngFile;
            downloadLink.download = 'qrcode.png';
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        };

        img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
    };

    return (
        <div>
            <div className='hidden' ref={qrCodeRef}>
                <QRCode
                    className="h-[200px]  w-[200px] "
                    size={180}
                    value={url}
                    viewBox={`0 0 256 256`} />
            </div>
            <Button onClick={handleDownload}>Download QR Code</Button>
        </div>
    );
};

