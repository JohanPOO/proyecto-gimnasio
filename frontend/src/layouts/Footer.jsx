const Footer = () => {
  return (
    <footer className="bg-black py-24">
      <div className="container mx-auto px-4">
        <div className="flex justify-between">
          <p className="text-white mb-3">
            Correo Electronico: athleticfisioperu56@gmail.com
          </p>
          <div className="flex space-x-4">
            <a
              href="https://www.facebook.com/gimnasiosenlima/?locale=es_LA"
              target="_blank"
              className="text-white hover:text-gray-400"
            >
              Facebook
            </a>
            <a
              href="https://www.tiktok.com/@athleticfisioperu"
              target="_blank"
              className="text-white hover:text-gray-400"
            >
              TikTok
            </a>
            <a
              href="https://api.whatsapp.com/send/?phone=51997128732&text&type=phone_number&app_absent=0"
              target="_blank"
              className="text-white hover:text-gray-400"
            >
              WhatsApp
            </a>
          </div>
        </div>
        <div className="flex justify-between">
          <div>
            <div className="text-white">
              <p>SEDE CHOSICA: Echenique - C.C. María Goretti (tercer piso)</p>{" "}
              SEDE COBIAN: Alfonso Cobian - MZ. H LT.18, Chosica, Peru
            </div>
          </div>
          <div className="text-white">
            <p>Numero Celular: 997 128 732</p>
          </div>
        </div>
        <p className="text-white mt-8 text-center">
          © 2023 Example Company. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
