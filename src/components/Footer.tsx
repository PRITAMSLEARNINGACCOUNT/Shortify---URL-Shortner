import Link from "next/link";

const Footer = () => {
  return (
    <footer className="m-3 px-8 py-3 md:w-[35vw] w-[90vw] container mx-auto bg-slate-900 rounded-full backdrop-blur-lg sticky bottom-5">
      <nav className="flex items-center justify-between ">
        <div className="md:block hidden">
          Made With ❤️ By{" "}
          <Link
            className="hover:underline"
            href={"https://www.linkedin.com/in/pritamstech/"}
          >
            pritamstech
          </Link>
        </div>
        <ul className="flex md:justify-end justify-center w-full md:w-fit gap-3 font-bold md:text-lg">
          <li>
            <Link href={"/Policies"}>Policies</Link>
          </li>
          <li>
            <Link href="mailto:pritamstech@hotmail.com">Mail Us</Link>
          </li>
          <li>
            <Link href={"/about"}>About Us</Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
