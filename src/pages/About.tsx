
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Target, Heart, Award } from 'lucide-react';

const About = () => {
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      image: "/placeholder.svg",
      description: "Passionate about sustainable fashion and ethical business practices."
    },
    {
      name: "Michael Chen",
      role: "Head of Design",
      image: "/placeholder.svg",
      description: "Award-winning designer with 10+ years in luxury fashion."
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Operations",
      image: "/placeholder.svg",
      description: "Expert in supply chain management and quality assurance."
    }
  ];

  const values = [
    {
      icon: Heart,
      title: "Sustainability",
      description: "We're committed to eco-friendly practices and sustainable materials."
    },
    {
      icon: Award,
      title: "Quality",
      description: "Every piece is crafted with attention to detail and premium materials."
    },
    {
      icon: Users,
      title: "Community",
      description: "Building a community of fashion-forward individuals who care about impact."
    },
    {
      icon: Target,
      title: "Innovation",
      description: "Constantly pushing boundaries in design and sustainable practices."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            About HEVEN
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Where sustainable fashion meets timeless elegance. We believe that great style 
            shouldn't come at the cost of our planet.
          </p>
        </section>

        {/* Brand Story */}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Our Story</h2>
              <p className="text-muted-foreground mb-4">
                Founded in 2020, HEVEN was born from a simple belief: fashion should be beautiful, 
                sustainable, and accessible. Our journey began when our founder, Sarah Johnson, 
                recognized the need for a brand that could deliver high-quality fashion while 
                maintaining ethical and environmental standards.
              </p>
              <p className="text-muted-foreground mb-4">
                What started as a small collection of eco-friendly basics has grown into a 
                comprehensive lifestyle brand, offering everything from everyday essentials to 
                statement pieces that make you feel confident and conscious.
              </p>
              <p className="text-muted-foreground">
                Today, we continue to push the boundaries of sustainable fashion, working with 
                artisans and suppliers who share our vision for a better, more beautiful world.
              </p>
            </div>
            <div className="relative">
              <img 
                src="/placeholder.svg" 
                alt="HEVEN Brand Story" 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="mb-16 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6">Our Mission</h2>
          <div className="bg-primary/5 rounded-lg p-8 max-w-4xl mx-auto">
            <p className="text-xl text-foreground font-medium mb-4">
              "To create beautiful, sustainable fashion that empowers individuals to express 
              their unique style while making a positive impact on the world."
            </p>
            <p className="text-muted-foreground">
              We're committed to transparency, quality, and continuous improvement in everything we do.
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-semibold text-foreground mb-2">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-muted-foreground text-sm">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
