import { useState, useEffect } from "react";
import { BlogAPI, BlogPost } from "../utils/blog-api";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
import { 
  Calendar, 
  Eye, 
  Tag,
  ArrowLeft,
  Share2,
  Facebook,
  Twitter
} from "lucide-react";
import { motion } from "motion/react";

interface BlogDetailPageProps {
  slug: string;
}

export function BlogDetailPage({ slug }: BlogDetailPageProps) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPost();
    loadRecentPosts();
  }, [slug]);

  const loadPost = async () => {
    setLoading(true);
    const { data } = await BlogAPI.getPostBySlug(slug);
    setPost(data);
    setLoading(false);
  };

  const loadRecentPosts = async () => {
    const { data } = await BlogAPI.getRecentPosts(3);
    if (data) {
      setRecentPosts(data.filter(p => p.slug !== slug));
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleShare = (platform: 'facebook' | 'twitter') => {
    const url = window.location.href;
    const title = post?.title || '';
    
    if (platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
    } else {
      window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
    }
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

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl mb-4">Không tìm thấy bài viết</h2>
          <Button onClick={() => window.location.hash = '#/blog'}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại danh sách
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Image */}
      <div className="relative h-[400px] md:h-[500px] overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        
        {/* Back Button */}
        <div className="absolute top-6 left-6">
          <Button
            variant="secondary"
            onClick={() => window.location.hash = '#/blog'}
            className="bg-white/90 backdrop-blur-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 -mt-20 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-8 md:p-12 shadow-2xl">
              {/* Header */}
              <div className="mb-8">
                <Badge className="mb-4 bg-brand-lavender/50 text-brand-navy border-0">
                  {post.category}
                </Badge>
                
                <h1 className="text-3xl md:text-4xl mb-6">
                  {post.title}
                </h1>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center gap-2">
                    <img
                      src={post.author.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(post.author.name)}&background=1b2460&color=fff`}
                      alt={post.author.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <div className="font-medium text-foreground">{post.author.name}</div>
                      <div className="text-xs">Tác giả</div>
                    </div>
                  </div>

                  <Separator orientation="vertical" className="h-10" />

                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(post.publishedAt)}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    <span>{post.views} lượt xem</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <div key={index} className="flex items-center gap-1 px-3 py-1 bg-brand-gray rounded-full text-sm">
                      <Tag className="w-3 h-3" />
                      <span>{tag}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Separator className="my-8" />

              {/* Content */}
              <div 
                className="prose prose-lg max-w-none whitespace-pre-wrap"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              <Separator className="my-8" />

              {/* Share */}
              <div>
                <h3 className="mb-4 flex items-center gap-2">
                  <Share2 className="w-5 h-5" />
                  Chia sẻ bài viết
                </h3>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => handleShare('facebook')}
                    className="flex items-center gap-2"
                  >
                    <Facebook className="w-4 h-4" />
                    Facebook
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleShare('twitter')}
                    className="flex items-center gap-2"
                  >
                    <Twitter className="w-4 h-4" />
                    Twitter
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Related Posts */}
          {recentPosts.length > 0 && (
            <div className="mt-16 mb-12">
              <h2 className="text-2xl mb-8">Bài viết liên quan</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {recentPosts.map((relatedPost) => (
                  <Card 
                    key={relatedPost.id}
                    className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => window.location.hash = `#/blog/${relatedPost.slug}`}
                  >
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <Badge className="mb-2 bg-brand-lavender/50 text-brand-navy text-xs border-0">
                        {relatedPost.category}
                      </Badge>
                      <h3 className="text-sm line-clamp-2 mb-2">
                        {relatedPost.title}
                      </h3>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
