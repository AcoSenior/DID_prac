import Header from './Header.jsx'

const Layout = ({ children, userId }) => {
    return (
        <div>
            <Header children={children} userId={userId} />
                {children}
        </div>
    );
}


export default Layout;