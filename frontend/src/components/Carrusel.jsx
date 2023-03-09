import { useState, useEffect } from "react";
import "../public/style.css"
import axios from "axios"

function Carrusel() {
    const [imagenActual, setImagenActual] = useState(0);
    const [images, setImages] = useState([])
    //const API = "SqZU5SUzOHKpoU3dnz1nkTQaTySDyUMa57EQqhy5H4qt1QCHyLjMIzhP"

    useEffect(() => {
        const callApi = async () => {
            /*const response = await axios.get("https://api.pexels.com/v1/curated?page=2&per_page=4", {
                headers: {
                    "Authorization": API
                }
            })*/

            const responses = [
                //"https://scontent-lim1-1.xx.fbcdn.net/v/t39.30808-6/292163226_3296707443931862_3675380885016704437_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=19026a&_nc_ohc=UI1zF52UQ3kAX-X7mry&_nc_ht=scontent-lim1-1.xx&oh=00_AfCiRz61GQRAngelyFB1_9RWUMWhSzm58rAa_xgnT39-Hw&oe=6402F86C",
                "https://scontent-lim1-1.xx.fbcdn.net/v/t1.6435-9/69259285_2466940106908604_1527425159416250368_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=zLHj81aIRo0AX_6PN3-&_nc_oc=AQkwKUlCGeesqEmg_8BmQTY23xVr3VsArN8NHDWzQyUKuIN3iIMKoGUsTnBDuCSD4lI&_nc_ht=scontent-lim1-1.xx&oh=00_AfDNniGxpEZKYutzN4xGbHWsSe2zvnKi2iv4iyrdYY74Xw&oe=64260E54",
                "https://scontent-lim1-1.xx.fbcdn.net/v/t1.6435-9/72956513_2518626861739928_1550527389069475840_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=3C0htwdSQo8AX8EhfHi&_nc_ht=scontent-lim1-1.xx&oh=00_AfBeUIqfoDEGp9_vN2CYRcz4XbJ7UcJdRazegCiYuVHMlw&oe=6425DB4C",
                "https://scontent-lim1-1.xx.fbcdn.net/v/t1.6435-9/208534723_3029332184002724_1821722694037210582_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=4LXFiXzFmZQAX_4kpbZ&_nc_ht=scontent-lim1-1.xx&oh=00_AfBsjJihUHL10GyI6voXuwLbAJeYATEn_WsL8ftBcBHpRw&oe=6425E56C",
                "https://scontent-lim1-1.xx.fbcdn.net/v/t1.6435-9/207000415_3030718103864132_1736266185516642879_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=T6_nrH4oUnYAX8Zk5pO&_nc_ht=scontent-lim1-1.xx&oh=00_AfB6aQ5cBPdtCd32GhtbAQ3-nrbkOu8SO0yBrwS-CVspTw&oe=6425FE9C"
            ]

            /*const photos = response.data.photos;
            const data = photos.map(function (url) {
                return url.src.landscape
            })*/

            const data = responses.map(function (url) {
                return url
            })

            setImages(data)
        }
        callApi()

    }, [])

    const atras = () => {
        const index = imagenActual === 0 ? images.length - 1 : imagenActual - 1;
        setImagenActual(index);
    };

    const siguiente = () => {
        const index = imagenActual === images.length - 1 ? 0 : imagenActual + 1;
        setImagenActual(index);
    };

    return (
        <div className="flex flex-col items-center w-full h-100">
            <img
                src={images[imagenActual]}
                alt={`Image ${imagenActual + 1}`}
                className="w-full h-full object-fit-cover mb-4 transition duration-500"
            />

            <div className="flex space-x-4">
                <button onClick={atras}>
                    <svg
                        className="w-6 h-6 fill-current text-gray-500 hover:text-gray-700 transition-transform hover:-translate-x-2"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12l4.58-4.59z" />
                    </svg>
                </button>
                <button onClick={siguiente}>
                    <svg
                        className="w-6 h-6 fill-current text-gray-500 hover:text-gray-700 transition-transform hover:translate-x-2"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        <path d="M8.59 16.41L10 18l6-6-6-6-1.41 1.41L13.17 12l-4.58 4.59z" />
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default Carrusel;
