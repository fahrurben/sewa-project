const HeaderNav = ({ user = null }) => {
  return (
    <div className="flex justify-center w-full border-b-2 border-[#1e1b22] min-h-18">
      <div className="flex justify-between w-[1200px]">
        <a
          href="/"
          className="text-3xl font-bold tracking-tight text-white sm:text-4xl h-18 leading-18"
        >
          Sewa
        </a>
        <div className="flex">
          <ul className="text-white flex gap-8 font-semi-bold text-md">
            <li>
              <a
                href="/"
                className="block hover:border-b-4 hover:border-[#cf4148] h-18 leading-18"
              >
                Home
              </a>
            </li>
            {user && (
              <>
                <li>
                  <a
                    href="/applications"
                    className="block hover:border-b-4 hover:border-[#cf4148] h-18 leading-18"
                  >
                    Applications
                  </a>
                </li>
                <li>
                  <a
                    href="/my-rent"
                    className="block hover:border-b-4 hover:border-[#cf4148] h-18 leading-18"
                  >
                    My Rent
                  </a>
                </li>
              </>
            )}
            {!user && (
              <li>
                <a
                  href="/login"
                  className="block hover:border-b-4 hover:border-[#cf4148] h-18 leading-18"
                >
                  Sign in
                </a>
              </li>
            )}
          </ul>
          <a
            href="/tenant/login"
            className="block h-12 bg-[#cf4148] leading-12 px-4 mt-3 ml-6 text-white font-semi-bold text-md rounded-lg"
          >
            Tenant Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default HeaderNav;
