import Navigation from "./Navigation";

const AboutPage = () => (
  <div className="min-h-screen bg-slate-50">
    <Navigation />
    <div className="max-w-4xl mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold text-slate-900 mb-4">About Safelance</h1>
      <p className="text-xl text-slate-600">The world's leading freelance marketplace</p>
    </div>
  </div>
);

export default AboutPage;