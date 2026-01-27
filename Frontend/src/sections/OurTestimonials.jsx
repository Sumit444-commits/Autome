import SectionTitle from "../components/SectionTitle";
import { motion } from "framer-motion";

export default function OurTestimonials() {
    const testimonials = [
    { 
        quote: "Super clean and easy to use. Autome saved me hours of manual documentation time by generating a professional README in seconds!", 
        name: "Richard Nelson", 
        role: "Open Source Contributor", 
        image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200", 
    },
    { 
        quote: "The AI analysis is top-notch. It picked up my complex MERN stack structure perfectly. Highly recommend for any dev!", 
        name: "Sophia Martinez", 
        role: "Full Stack Developer", 
        image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200", 
    },
    { 
        quote: "Absolutely love the Markdown quality. My GitHub profile looks 10x more professional now thanks to Autome.", 
        name: "Ethan Roberts", 
        role: "Software Engineer", 
        image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60", 
    },
    { 
        quote: "Clean, elegant, and efficient. This tool is a dream for modern developers who hate writing repetitive docs.", 
        name: "Isabella Kim", 
        role: "Backend Lead", 
        image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=60", 
    },
    { 
        quote: "I've tried dozens of README generators, but this one actually understands the code. Everything works seamlessly.", 
        name: "Liam Johnson", 
        role: "DevOps Engineer", 
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&h=100&auto=format&fit=crop", 
    },
    { 
        quote: "Brilliantly structured AI prompts. It makes repository showcasing a joy! A must-have tool in my dev workflow.", 
        name: "Ava Patel", 
        role: "Software Developer", 
        image: "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/userImage/userImage1.png", 
    },
];

    return (
        <section className="flex flex-col items-center" id="testimonials">
            <SectionTitle title="Developer testimonials" description="Trusted by engineers who value their time and project presentation." />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-18 max-w-6xl mx-auto">
                {testimonials.map((testimonial, index) => (
                    <motion.div key={testimonial.name} className="group border border-slate-800 p-6 rounded-xl"
                        initial={{ y: 150, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: `${index * 0.15}`, type: "spring", stiffness: 320, damping: 70, mass: 1 }}
                    >
                        <p className="text-slate-100 text-base">{testimonial.quote}</p>
                        <div className="flex items-center gap-3 mt-8 group-hover:-translate-y-1 duration-300">
                            <img className="size-10 rounded-full" src={testimonial.image} alt="user image" />
                            <div>
                                <h2 className="text-gray-200 font-medium">
                                    {testimonial.name}
                                </h2>
                                <p className="text-indigo-500">{testimonial.role}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}