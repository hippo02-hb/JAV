import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Award, Briefcase, GraduationCap } from "lucide-react";

// Import images directly for Vite to handle
import trieuImg from "../public/BOD/trieu.png";
import tanImg from "../public/BOD/tan.png";
import vyImg from "../public/BOD/vy.png";

export function Teachers() {
  const teachers = [
    {
      name: "Nguyễn Quang Triệu",
      src: trieuImg,
      role: "Giám đốc chương trình, Giáo viên",
      jlpt: "N2",
      experience: "6 năm kinh nghiệm giảng dạy",
      education: "Cử nhân trường Đại học Hoa Sen, chuyên ngành PR",
      achievements: [
        "Nhà sáng lập TNQDO",
        "Thực tập biên tập viên tại Báo Tuổi Trẻ TP.HCM",
        "Biên dịch viên anime: Neon Genesis Evangelion, La Tiểu Hắc Chiến Kí 2",
        "Biên dịch Manga: Mike to Hasuki, Hikikomori to Dokuzetsu na Kishisama"
      ]
    },
    {
      name: "Lê Đình Tân",
      role: "Giáo viên",
      src: tanImg,
      jlpt: "N2",
      experience: "2 năm kinh nghiệm giảng dạy",
      training: "Đã được đào tạo Nghiệp vụ dạy tiếng Nhật chuyên nghiệp",
      achievements: [
        "Làm việc tại Công ty TNHH Hyogo Shoes",
        "Nhân viên phục vụ tại Hoshi Sushi & Bar"
      ]
    },
    {
      name: "Phạm Thùy Tường Vy",
      role: "Trợ giảng",
      src: vyImg,
      jlpt: "N5",
      experience: "1 năm kinh nghiệm giảng dạy",
      training: "Đã được đào tạo Nghiệp vụ dạy tiếng Nhật chuyên nghiệp",
      achievements: [
        "Phục vụ khách hàng quốc tế tại White Palace, Capella Palace",
        "Nhân viên pha chế tại khách sạn Ramana Saigon"
      ]
    }
  ];

  return (
    <section id="teachers" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-brand-lavender/50 text-brand-navy rounded-full mb-4">
            Đội ngũ
          </div>
          <h2 className="text-3xl md:text-4xl mb-6">
            Giáo Viên Của Chúng Tôi
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Đội ngũ giáo viên giàu kinh nghiệm, tâm huyết và chuyên nghiệp
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {teachers.map((teacher, index) => (
            <Card key={index} className="p-6 hover:shadow-xl transition-shadow">
              <img 
                src={teacher.src}
                alt={teacher.name}
                className="w-24 h-24 mx-auto mb-4 rounded-full object-cover"
              />

              <div className="text-center mb-4">
                <h3 className="mb-1">{teacher.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{teacher.role}</p>
                <Badge className="bg-brand-navy">JLPT {teacher.jlpt}</Badge>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <Award className="w-4 h-4 text-brand-navy mt-0.5 flex-shrink-0" />
                  <span>{teacher.experience}</span>
                </div>
                
                {teacher.education && (
                  <div className="flex items-start gap-2">
                    <GraduationCap className="w-4 h-4 text-brand-navy mt-0.5 flex-shrink-0" />
                    <span>{teacher.education}</span>
                  </div>
                )}

                {teacher.training && (
                  <div className="flex items-start gap-2">
                    <GraduationCap className="w-4 h-4 text-brand-navy mt-0.5 flex-shrink-0" />
                    <span>{teacher.training}</span>
                  </div>
                )}

                <div className="pt-3 border-t">
                  <div className="flex items-start gap-2 mb-2">
                    <Briefcase className="w-4 h-4 text-brand-navy mt-0.5 flex-shrink-0" />
                    <span className="text-xs">Thành tựu:</span>
                  </div>
                  <ul className="space-y-1 text-xs text-muted-foreground ml-6">
                    {teacher.achievements.map((achievement, idx) => (
                      <li key={idx} className="list-disc">{achievement}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
