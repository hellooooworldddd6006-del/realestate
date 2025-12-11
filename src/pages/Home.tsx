import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase, Property } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Bed, Bath, Maximize, Star } from 'lucide-react';

export default function Home() {
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProperties();
  }, []);

  const fetchFeaturedProperties = async () => {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('is_featured', true)
        .eq('status', 'available')
        .order('created_at', { ascending: false })
        .limit(6);

      if (error) throw error;
      setFeaturedProperties(data || []);
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="text-2xl font-bold text-emerald-600">
              Mahamaya Realtors
            </Link>
            <nav className="flex items-center gap-6">
              <Link to="/" className="text-gray-700 hover:text-emerald-600 transition">
                Home
              </Link>
              <Link to="/admin/login">
                <Button variant="outline" size="sm">
                  Admin Login
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <section className="bg-gradient-to-br from-emerald-50 to-emerald-100 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6 animate-fade-up">
            Find Your Dream Home in Goa
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: '0.1s' }}>
            Discover premium villas, apartments, and plots with trusted local expertise
          </p>
          <Button size="lg" className="animate-fade-up" style={{ animationDelay: '0.2s' }}>
            Explore Properties
          </Button>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Properties</h2>
              <p className="text-gray-600">Handpicked properties just for you</p>
            </div>
            <Star className="w-8 h-8 text-yellow-500 fill-yellow-500" />
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
            </div>
          ) : featuredProperties.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <p className="text-gray-500 text-lg">No featured properties available at the moment</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {featuredProperties.map((property, index) => (
                <Card
                  key={property.id}
                  className="overflow-hidden hover:shadow-xl transition-all duration-300 animate-fade-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={property.image_url}
                      alt={property.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                    <Badge className="absolute top-4 right-4 bg-emerald-600">
                      {property.property_type}
                    </Badge>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
                      {property.title}
                    </h3>
                    <div className="flex items-center text-gray-600 mb-4">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="text-sm">{property.location}</span>
                    </div>
                    <p className="text-gray-600 mb-4 line-clamp-2">{property.description}</p>
                    <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Bed className="w-4 h-4 mr-1" />
                        {property.bedrooms}
                      </div>
                      <div className="flex items-center">
                        <Bath className="w-4 h-4 mr-1" />
                        {property.bathrooms}
                      </div>
                      <div className="flex items-center">
                        <Maximize className="w-4 h-4 mr-1" />
                        {property.area} sq ft
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t">
                      <span className="text-2xl font-bold text-emerald-600">
                        ₹{property.price.toLocaleString()}
                      </span>
                      <Button size="sm">View Details</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4">Mahamaya Realtors</h3>
          <p className="text-gray-400 mb-4">Your trusted partner in Goa real estate</p>
          <p className="text-sm text-gray-500">© 2024 Mahamaya Realtors. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
