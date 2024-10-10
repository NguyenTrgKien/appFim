import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../../assets/logo/logo.png';
import { Link } from 'react-router-dom';
import { faChevronDown, faGlobe, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import style from './Header.module.scss';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import Menu from '../../component/Menu';

const menuItem = [
    {
        name: 'Phim lẻ',
        to: '/',
    },
    {
        name: 'Điện ảnh',
        to: '/',
    },
    {
        name: 'Võ thuật',
        to: '/',
    },
    {
        name: 'Cổ trang',
        to: '/detailmovie',
    },
];

const menuLanguage = [
    {
        name: 'Tiếng Việt',
    },
    {
        name: 'English',
    },
    {
        name: 'Japan',
    },
];

const apiKey = '122d1263283f2d9f0ac96a53bbf7e793';
function Header({scrollHeader}) {
    const [colorHeader, setColorHeader] = useState(false);
    const [listGenre, setListGenre] = useState();

    const fetchApi = async () => {
        const getGenreMovie = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=vi-VN`);
        const dataGenreMovie = await getGenreMovie.json();
        console.log(dataGenreMovie);
        setListGenre(dataGenreMovie.genres);
        
    }

    useEffect(() => {
        fetchApi();
    },[]);
    
    useEffect(() => {
        if(scrollHeader){
            const handleScroll = () => {
                if (window.scrollY >= 200) {
                    setColorHeader(true);
                }else{
                    setColorHeader(false);
                }            
            };
            window.addEventListener('scroll', handleScroll);
        }else{
            setColorHeader(true);
        }
    }, []);

    return (
        <header
            className={clsx(style['wrapper'], {
                [style.bgcolor]: colorHeader,
            })}
        >
            <div className={clsx(style['logo-nav'])}>
                <img className={clsx(style['img-logo'])} src={logo} alt="logo" />
                <nav className={clsx(style['navigation'])}>
                    <ul>
                        <li>
                            <Link to="/" className={clsx(style['navigation-link'])}>
                                Trang chủ
                            </Link>
                        </li>
                        <li>
                            <Link to="/genremovie/Phim mới nhất" target='_blank' className={clsx(style['navigation-link'])}>
                                Phim mới nhất
                            </Link>
                        </li>
                        <li>
                            <Link to="/genremovie/Phim hành động" target='_blank' className={clsx(style['navigation-link'])}>
                                Phim hành động
                            </Link>
                        </li>
                        <li>
                            <Link to="/genremovie/Phim kinh dị" target='_blank' className={clsx(style['navigation-link'])}>
                                Phim kinh dị
                            </Link>
                        </li>
                        <li>
                            <Menu typeMenu content={listGenre}>
                                <div className={clsx(style['navigation-link'])}>
                                    Thể loại
                                    <FontAwesomeIcon icon={faChevronDown} className={clsx(style['navigation-link-icon'])}/>
                                </div>
                            </Menu>
                        </li>
                    </ul>
                </nav>
            </div>

            <div className={clsx(style['search-login'])}>
                <div className={clsx(style['wrap-input'])}>
                    <input type="text" placeholder="Tìm kiếm" className={clsx(style['input'])} />
                    <button className={clsx(style['search-btn'])}>
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                </div>
                <Menu menuLanguage contentLang={menuLanguage}>
                    <div className={clsx(style['language'])}>
                        <FontAwesomeIcon icon={faGlobe} />
                        Language
                    </div>
                </Menu>
                <div className={clsx(style['register'])}>
                    <FontAwesomeIcon icon={faUser} />
                    Register
                </div>
            </div>
        </header>
    );
}

export default Header;
