
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ContactSection = () => {
  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Contact <span className="text-scorpion-red">Us</span>
          </h2>
          <p className="text-lg text-white/70 max-w-3xl mx-auto">
            Ready to enhance your security? Get in touch with our team of experts
            for a free consultation and personalized security assessment.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact Form */}
          <div className="bg-scorpion-gray/30 p-8 rounded-lg">
            <h3 className="text-xl font-bold mb-6 text-white">Send Us a Message</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="text-white mb-2 block">Full Name</label>
                  <Input id="name" placeholder="John Doe" className="bg-black border-scorpion-gray/50 text-white" />
                </div>
                <div>
                  <label htmlFor="email" className="text-white mb-2 block">Email Address</label>
                  <Input id="email" type="email" placeholder="john@example.com" className="bg-black border-scorpion-gray/50 text-white" />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="text-white mb-2 block">Subject</label>
                <Input id="subject" placeholder="How can we help you?" className="bg-black border-scorpion-gray/50 text-white" />
              </div>
              <div>
                <label htmlFor="message" className="text-white mb-2 block">Message</label>
                <Textarea id="message" placeholder="Please describe your security needs..." className="bg-black border-scorpion-gray/50 text-white min-h-[120px]" />
              </div>
              <Button type="submit" className="w-full bg-scorpion-red hover:bg-scorpion-red/80 text-white">
                Send Message
              </Button>
            </form>
          </div>
          
          {/* Contact Information */}
          <div className="flex flex-col justify-center">
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4 text-white">Our Headquarters</h3>
              <p className="text-white/80">1234 Security Avenue, Defender District</p>
              <p className="text-white/80">New York, NY 10001</p>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4 text-white">Contact Information</h3>
              <p className="text-white/80">Email: info@scorpionsecurity.com</p>
              <p className="text-white/80">Phone: +1 (555) 123-4567</p>
              <p className="text-white/80">Emergency Line: +1 (555) 911-0000</p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4 text-white">Business Hours</h3>
              <p className="text-white/80">Monday - Friday: 9:00 AM - 6:00 PM</p>
              <p className="text-white/80">Saturday: 10:00 AM - 4:00 PM</p>
              <p className="text-white/80">Emergency Response: 24/7/365</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
