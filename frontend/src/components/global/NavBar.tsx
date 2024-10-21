import Logo from '../../../public/Logo.png';
import IconBar from './IconBar';
import Language from './Language';
import Mode from './Mode';

const Navbar = () => {
  return (
    <nav className="bg-black  flex ">

      {/* Left Section: Logo */}
      <div className='ps-8 w-[10%]  '>
        <img src={Logo} alt="Logo" className="w-28" />
      </div>

      {/* icons bar*/ }
      <div className="w-[70%] p-6 relative">
        <IconBar/>
      </div> 

      {/* End section  */}
      <div className='w-[20%] p-8 flex justify-between'>
        <Language/>
        <div className='pt-3'><Mode/></div>
      </div>

    </nav>
  );
};

export default Navbar;
