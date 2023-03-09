
const Footer = () => {
    return (
        <footer className="bg-black py-24">
            <div className="container mx-auto px-4">
                <div className="flex justify-between">
                    <p className="text-white">© 2023 Example Company. All rights reserved.</p>
                    <div className="flex space-x-4">
                        <a href="#" className="text-white hover:text-gray-400">
                            Facebook
                        </a>
                        <a href="#" className="text-white hover:text-gray-400">
                            Twitter
                        </a>
                        <a href="#" className="text-white hover:text-gray-400">
                            Instagram
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer