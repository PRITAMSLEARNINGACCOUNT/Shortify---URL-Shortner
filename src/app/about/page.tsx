const About = () => {
  return (
    <div
      style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}
      className="min-h-[80vh] text-center"
    >
      <h1 className="text-3xl font-bold md:mt-0 mt-5">About Shortify</h1>
      <p className="text-lg md:p-5 md:mt-0 mt-5">
        Welcome to <strong>Shortify</strong>, the ultimate URL shortening
        platform designed to make your links more manageable and shareable. Our
        mission is to provide a seamless and efficient way to shorten your URLs,
        making it easier for you to share them across various platforms without
        any hassle.
      </p>
      <h2 className="text-3xl font-bold md:mt-0 mt-5">Why Choose Shortify?</h2>
      <ul className="text-lg md:p-5 md:mt-0 mt-5">
        <li>
          <strong>Easy to Use:</strong> Our platform is user-friendly and
          intuitive, allowing you to shorten URLs in just a few clicks.
        </li>
        <li>
          <strong>Reliable:</strong> We ensure that your shortened URLs are
          always accessible and reliable.
        </li>
      </ul>
      <h2 className="text-3xl font-bold md:mt-0 mt-5">Affordable Pricing</h2>
      <p className="text-lg md:p-5 md:mt-0 mt-5">
        At Shortify, we believe in providing top-notch services at an affordable
        price. Our pricing plans are designed to cater to different needs and
        budgets, ensuring that everyone can benefit from our platform without
        breaking the bank.
      </p>
      <ul className="text-lg md:p-5">
        <li className="mt-3">
          <strong>Free Plan:</strong> Get started with our free plan, which
          includes basic URL shortening features.
        </li>
        <li className="mt-3">
          <strong>VIP Plan:</strong> Upgrade to our VIP plan for more links
          generation and more links visits with proper customer support.
        </li>
        <li className="mt-3">
          <strong>Premium Plan:</strong> For large organizations, our Enterprise
          plan offers comprehensive solutions and dedicated support.
        </li>
      </ul>
      <p className="mt-5 text-lg">
        Join Shortify today and experience the convenience of URL shortening
        with a platform that prioritizes your needs and budget.
      </p>
    </div>
  );
};

export default About;
