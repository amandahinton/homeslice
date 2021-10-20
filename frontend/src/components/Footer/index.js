const Footer = ( { isSplash }) => {

  return (
    <div className={isSplash ? "footerDiv" : "footerDiv screen-footer"}>
      <p className="footerText">Copyright ©2021 All Rights Reserved.</p>
      <p className="footerLink"><a href={"https://amandahinton.com/"} target={"_blank"} rel={"noreferrer"}>Created by Amanda Hinton</a></p>
    </div>
  );
};

export default Footer;
