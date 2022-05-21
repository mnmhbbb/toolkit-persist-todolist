import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <>
      <nav>
        <Link to='/'>전체</Link>
        <Link to='/completed'>완료목록</Link>
        <Link to='/created'>생성순</Link>
        <Link to='/deadline'>마감순</Link>
      </nav>
    </>
  );
};

export default Nav;
