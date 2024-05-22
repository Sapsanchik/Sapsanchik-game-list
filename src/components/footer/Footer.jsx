import '../../index.css';

const Footer = () => {
    return (
        <footer className="footer h-20 bg-slate-800 text-white flex justify-around pt-5">
            <div className="footer__copyright">
                {' '}
                © {new Date().getFullYear()} Game Store. Все права защищены.
            </div>
            <div className="footer__social flex gap-10">
                <a
                    href="https://store.steampowered.com/"
                    target="_blank"
                    rel="noreferrer"
                >
                    Steam
                </a>
                <a
                    href="https://store.playstation.com/en-us/pages/latest"
                    target="_blank"
                    rel="noreferrer"
                >
                    PS Store
                </a>
                <a
                    href="https://www.xbox.com/ru-RU/xbox-game-pass"
                    target="_blank"
                    rel="noreferrer"
                >
                    Xbox Game Pass
                </a>
            </div>
        </footer>
    );
};

export default Footer;
