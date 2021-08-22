const Splash = () => {

  return (
    <div className="homepage">
      <div className="homepage-text">
        <h1 className="homepage-title">Welcome Home!</h1>
        <h2 className="homepage-description">
          Homeslice helps homeowners organize all of the maintenance and repair activities for their home.
        </h2>
        <h4 className="homepage-value">
          Use our suggested tasks or create your own custom ones. Stay on top of the recurring needs of your property—from roof inspection to gutter cleaning to appliance upkeep—extending and protecting the value and safety of your home.
        </h4>
      </div>
      <img className="homepage-pic" src="/splash.png" alt="Welcome to Homeslice" />
    </div>
  );
};

export default Splash;
