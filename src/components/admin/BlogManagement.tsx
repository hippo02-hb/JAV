import { useState, useEffect } from "react";
import { BlogAdminAPI } from "../../utils/blog-admin-api";
import { BlogPost } from "../../utils/blog-api";
import { BlogForm } from "./BlogForm";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye,
  FileText,
  Calendar,
  User,
  BarChart3
} from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner@2.0.3";
import { eventBus, EVENTS } from "../../utils/event-bus";

interface BlogManagementProps {
  onBlogChange: () => void;
}

export function BlogManagement({ onBlogChange }: BlogManagementProps) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft'>('all');

  useEffect(() => {
    loadPosts();
    
    // Listen for blog updates
    const handleBlogUpdated = () => {
      loadPosts();
      onBlogChange();
    };

    eventBus.on(EVENTS.BLOG_UPDATED, handleBlogUpdated);
    
    return () => {
      eventBus.off(EVENTS.BLOG_UPDATED, handleBlogUpdated);
    };
  }, [onBlogChange]);

  useEffect(() => {
    filterPosts();
  }, [posts, searchQuery, filterStatus]);

  const loadPosts = async () => {
    setLoading(true);
    try {
      const { data, error } = await BlogAdminAPI.getPosts(); // CORRECTED: Was getAllPosts
      if (error) {
        toast.error('Lỗi khi tải danh sách bài viết: ' + error);
      } else if (data) {
        setPosts(data);
      }
    } catch (error) {
      toast.error('Lỗi khi tải danh sách bài viết');
    } finally {
      setLoading(false);
    }
  };

  const filterPosts = () => {
    let filtered = posts;

    // Filter by status
    if (filterStatus === 'published') {
      filtered = filtered.filter(post => post.isPublished);
    } else if (filterStatus === 'draft') {
      filtered = filtered.filter(post => !post.isPublished);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(query) ||
        (post.excerpt && post.excerpt.toLowerCase().includes(query)) ||
        (post.category && post.category.toLowerCase().includes(query)) ||
        (post.tags && post.tags.some(tag => tag.toLowerCase().includes(query)))
      );
    }

    setFilteredPosts(filtered);
  };

  const handleAddPost = () => {
    setEditingPost(null);
    setShowForm(true);
  };

  const handleEditPost = (post: BlogPost) => {
    setEditingPost(post);
    setShowForm(true);
  };

  const handleDeletePost = async (postId: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa bài viết này?')) {
      return;
    }

    try {
      const result = await BlogAdminAPI.deletePost(postId);
      if (!result.error) { // CORRECTED: Was result.success
        toast.success('Xóa bài viết thành công');
        // The event listener will call loadPosts()
      } else {
        toast.error(result.error || 'Lỗi khi xóa bài viết');
      }
    } catch (error) {
      toast.error('Lỗi khi xóa bài viết');
    }
  };

  const handleFormSubmit = async (postData: Partial<BlogPost>) => {
    try {
      let result;
      
      if (editingPost) {
        // Update existing post
        result = await BlogAdminAPI.updatePost(editingPost.id, postData);
        if (result.data) {
          toast.success('Cập nhật bài viết thành công');
        } else {
          toast.error(result.error || 'Lỗi khi cập nhật bài viết');
          return;
        }
      } else {
        // Create new post
        result = await BlogAdminAPI.createPost(postData);
        if (result.data) {
          toast.success('Tạo bài viết mới thành công');
        } else {
          toast.error(result.error || 'Lỗi khi tạo bài viết');
          return;
        }
      }
      
      setShowForm(false);
      setEditingPost(null);
      // The event listener will call loadPosts() and onBlogChange()
    } catch (error) {
      toast.error('Lỗi khi lưu bài viết');
    }
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingPost(null);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (showForm) {
    return (
      <BlogForm
        blog={editingPost}
        onSubmit={handleFormSubmit}
        onCancel={handleFormCancel}
      />
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-navy mx-auto mb-4"></div>
          <p className="text-muted-foreground">Đang tải danh sách bài viết...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <FileText className="h-6 w-6 text-brand-navy" />
          <h1>Quản lý Blog</h1>
          <span className="text-sm text-gray-500">({posts.length} bài viết)</span>
        </div>
        <Button onClick={handleAddPost} className="bg-brand-navy hover:bg-brand-navy/90">
          <Plus className="h-4 w-4 mr-2" />
          Thêm bài viết
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Tổng bài viết</p>
              <p className="text-2xl">{posts.length}</p>
            </div>
            <FileText className="h-8 w-8 text-brand-navy" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Đã xuất bản</p>
              <p className="text-2xl text-brand-green">{posts.filter(p => p.isPublished).length}</p>
            </div>
            <Eye className="h-8 w-8 text-brand-green" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Bản nháp</p>
              <p className="text-2xl text-yellow-600">{posts.filter(p => !p.isPublished).length}</p>
            </div>
            <FileText className="h-8 w-8 text-yellow-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Tổng lượt xem</p>
              <p className="text-2xl text-brand-navy">{posts.reduce((sum, p) => sum + (p.views || 0), 0)}</p>
            </div>
            <BarChart3 className="h-8 w-8 text-brand-navy" />
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm bài viết..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            {(['all', 'published', 'draft'] as const).map((status) => (
              <Button
                key={status}
                variant={filterStatus === status ? "default" : "outline"}
                onClick={() => setFilterStatus(status)}
                className={filterStatus === status ? "bg-brand-navy" : ""}
              >
                {status === 'all' && 'Tất cả'}
                {status === 'published' && 'Đã xuất bản'}
                {status === 'draft' && 'Bản nháp'}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Posts List */}
      {filteredPosts.length === 0 ? (
        <Card className="p-12 text-center">
          <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg mb-2">Chưa có bài viết nào</h3>
          <p className="text-muted-foreground mb-4">
            {searchQuery ? 'Không tìm thấy bài viết phù hợp' : 'Hãy tạo bài viết đầu tiên'}
          </p>
          {!searchQuery && (
            <Button onClick={handleAddPost} className="bg-brand-navy hover:bg-brand-navy/90">
              <Plus className="h-4 w-4 mr-2" />
              Thêm bài viết
            </Button>
          )}
        </Card>
      ) : (
        <div className="grid gap-4">
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg line-clamp-1">{post.title}</h3>
                      <Badge 
                        variant={post.isPublished ? "default" : "secondary"}
                        className={post.isPublished ? "bg-brand-green/10 text-brand-green border-brand-green/20" : ""}
                      >
                        {post.isPublished ? 'Đã xuất bản' : 'Bản nháp'}
                      </Badge>
                      <Badge variant="outline">{post.category}</Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        <span>{post.author.name}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{formatDate(post.updatedAt)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        <span>{post.views || 0} lượt xem</span>
                      </div>
                    </div>
                    
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {post.tags.slice(0, 3).map((tag, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {post.tags.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{post.tags.length - 3}
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(`#/blog/${post.slug}`, '_blank')}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditPost(post)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeletePost(post.id)}
                      className="text-brand-rose hover:text-brand-rose/80 hover:bg-brand-rose/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}