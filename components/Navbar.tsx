import React from "react";

function Navbar() {
  return <DesktopNavbar />;
}

function DesktopNavbar() {
  return (
	<div className="hidden border-separate border-b bg-background md:block">
	  <nav className="container flex items-center justify-between px-8">
		{/* Add your nav content here */}
	  </nav>
	</div>
  );
}

export default Navbar;
