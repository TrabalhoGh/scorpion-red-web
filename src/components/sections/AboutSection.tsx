
const AboutSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-black to-scorpion-gray/90">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          {/* Image Side */}
          <div className="lg:w-1/2">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-full h-full border-2 border-scorpion-red"></div>
              <img 
                src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80" 
                alt="Security Team" 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
          
          {/* Content Side */}
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              About <span className="text-scorpion-red">Scorpion Security</span>
            </h2>
            
            <p className="text-white/80 mb-6">
              Founded in 2010, Scorpion Security has grown to become a leading provider of comprehensive security 
              solutions. With over a decade of experience, we've protected thousands of clients across industries.
            </p>
            
            <p className="text-white/80 mb-6">
              Our team consists of former military personnel, law enforcement officers, and security specialists 
              with extensive training and field experience. We believe that security is not just about technology 
              and manpower, but about strategic planning and intelligent implementation.
            </p>
            
            <div className="grid grid-cols-2 gap-6 mt-10">
              <div className="text-center">
                <div className="text-4xl font-bold text-scorpion-red mb-2">1000+</div>
                <div className="text-white">Clients Protected</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-scorpion-red mb-2">150+</div>
                <div className="text-white">Security Experts</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-scorpion-red mb-2">12+</div>
                <div className="text-white">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-scorpion-red mb-2">24/7</div>
                <div className="text-white">Customer Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
