import { useState, useEffect } from "react";
import { BlogAPI, BlogPost } from "../utils/blog-api";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Calendar, Eye, Search, Tag, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

export function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPosts();
    loadCategories();
  }, []);

  useEffect(() => {
    filterPosts();
  }, [posts, selectedCategory, searchQuery]);

  const loadPosts = async () => {
    setLoading(true);
    const { data } = await BlogAPI.getAllPosts();
    if (data) {
      setPosts(data);
    }
    setLoading(false);
  };

  const loadCategories = async () => {
    const { data } = await BlogAPI.getCategories();
    if (data) {
      setCategories(data);
    }
  };

  const filterPosts = () => {
    let filtered = posts;

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    setFilteredPosts(filtered);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-navy mx-auto mb-4"></div>
          <p className="text-muted-foreground">Đang tải bài viết...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-navy to-brand-navy/80 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl mb-4 text-white">
                Blog TNQDO
              </h1>
              <p className="text-xl text-white/90 mb-8">
                Chia sẻ kiến thức, kinh nghiệm và tips học tiếng Nhật hiệu quả
              </p>

              {/* Search */}
              <div className="max-w-2xl mx-auto relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Tìm kiếm bài viết..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-3 text-gray-900 bg-white"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Category Filter */}
            <div className="mb-12">
              <div className="flex flex-wrap gap-3 justify-center">
                <Button
                  variant={selectedCategory === "all" ? "default" : "outline"}
                  onClick={() => setSelectedCategory("all")}
                  className={selectedCategory === "all" ? "bg-brand-navy" : ""}
                >
                  Tất cả
                </Button>
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category)}
                    className={selectedCategory === category ? "bg-brand-navy" : ""}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            {/* Blog Posts Grid */}
            {filteredPosts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-muted-foreground">
                  Không tìm thấy bài viết nào
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="h-full hover:shadow-xl transition-all duration-300 group overflow-hidden">
                      {/* Image */}
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>

                      <CardContent className="p-6">
                        {/* Category & Date */}
                        <div className="flex items-center gap-3 mb-3">
                          <Badge className="bg-brand-lavender/50 text-brand-navy border-0">
                            {post.category}
                          </Badge>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(post.publishedAt)}</span>
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className="text-xl mb-3 line-clamp-2 group-hover:text-brand-navy transition-colors">
                          {post.title}
                        </h3>

                        {/* Excerpt */}
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.slice(0, 3).map((tag, idx) => (
                            <div key={idx} className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Tag className="w-3 h-3" />
                              <span>{tag}</span>
                            </div>
                          ))}
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-4 border-t">
                          <div className="flex items-center gap-2">
                            <img
                              src={post.author.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(post.author.name)}&background=1b2460&color=fff`}
                              alt={post.author.name}
                              className="w-8 h-8 rounded-full"
                            />
                            <span className="text-sm text-muted-foreground">{post.author.name}</span>
                          </div>

                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Eye className="w-4 h-4" />
                            <span>{post.views}</span>
                          </div>
                        </div>

                        {/* Read More Button */}
                        <Button
                          className="w-full mt-4 bg-brand-navy hover:bg-brand-navy/90 group/btn"
                          onClick={() => window.location.hash = `#/blog/${post.slug}`}
                        >
                          Đọc tiếp
                          <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
