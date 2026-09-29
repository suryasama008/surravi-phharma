import Image from 'next/image';

export const CATALOGUE_PATH = '/catalogue/Surravi-Phharma-Product-Catalogue.pdf';

export default function CatalogueDownload() {
  return (
    <section className="section" id="catalogue">
      <div className="container catalogue-card">
        <div className="catalogue-text">
          <span className="catalogue-badge">Free Download</span>
          <h2>Download Our Product Catalogue</h2>
          <p>
            Get the complete Surravi Phharma product list as a PDF — APIs, excipients,
            vitamins, amino acids, colours, oils, flavours, phosphates and more, with
            IP / BP / EP / USP grades. Save it to your phone or share it with your
            purchase team.
          </p>
          <a
            href={CATALOGUE_PATH}
            download="Surravi-Phharma-Product-Catalogue.pdf"
            className="btn btn-primary"
          >
            ⬇ Download PDF Catalogue
          </a>
        </div>
        <div className="catalogue-qr">
          <Image
            src="/images/catalogue-qr.svg"
            alt="QR code to download the Surravi Phharma product catalogue PDF"
            width={180}
            height={180}
            unoptimized
          />
          <span>Scan to download</span>
        </div>
      </div>
    </section>
  );
}
