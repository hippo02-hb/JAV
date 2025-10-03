import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

export function FAQ() {
  const faqs = [
    {
      question: "Có học Offline hay không?",
      answer: "TNQDO hoạt động 100% trực tuyến (Online) nhằm phục vụ cho những học viên bận rộn mà vẫn muốn học, hoặc những bạn sinh sống tại Nhật và sắp thi JLPT tại Nhật. TNQDO dự định sẽ mở trung tâm và hoạt động Offline vào một ngày không xa khi mà lượng lớn học viên bày tỏ mong muốn được học Offline."
    },
    {
      question: "Trung tâm có hỗ trợ luyện thi JLPT không?",
      answer: "Có, không những có khóa học luyện thi toàn diện kĩ năng nghe hiểu, đọc hiểu. TNQDO với đội ngũ giáo viên và trợ giảng hùng hậu còn hỗ trợ bạn suốt quá trình viết hồ sơ dự thi, nhắc nhở bạn lấy phiếu báo danh. Giúp cho bạn cảm thấy an toàn, tự tin trước khi bước vào kì thi."
    },
    {
      question: "Có cần kiến thức nền không?",
      answer: "Có một số môn tại TNQDO ví dụ như các môn học trình độ N3, các môn đào tạo nghiệp vụ thì cần kiến thức nền. Nhưng nếu bạn không có thì hoàn toàn có thể học từ đầu các môn học nhập môn với đầy đủ kiến thức nền vững chắc phục vụ cho việc học tiếng Nhật lâu dài. Hoặc khi học Nhập môn, nếu bạn đã vốn có kiến thức nền về văn hóa Nhật Bản, về Anime, Manga, thì khóa học sẽ rất thú vị khi mà đội ngũ giáo viên cũng là những \"Otaku\" đệ nhất! Giáo viên tại TNQDO sẽ khiến bạn u mê khi học tiếng Nhật cùng những mẫu ngữ pháp mà bias bạn thường dùng."
    },
    {
      question: "Thời gian bao lâu để đạt N5?",
      answer: "\"Ngày xưa khi tự học, tôi đã tốn hơn 2 năm để đạt được N5. Tôi tự học N5 bằng sách và các tài liệu khác nhau để tự học hỏi và nuôi dưỡng đam mê bằng tinh thần Otaku. Nhưng 2 năm để đạt N5 là khoảng thời gian quá dài. Hiểu nỗi khổ đó, khi thiết kế các khóa học cho trình độ N5, tôi đã thiết kế lộ trình sao cho chỉ cần từ 7-11 tháng, các bạn không chỉ hiểu N5 mà đủ kiến thức nền tảng của trình độ N4 và sẵn sàng cho hành trình học N3\" - Thầy Quang Triệu chia sẻ. Như vậy các bạn chỉ cần tốn từ 7 tháng trở lên để đạt trình độ N5 khi học tại TNQDO. Còn nếu tự học với tài liệu internet, kiến thức truyền miệng, bạn sẽ phải tốn từ 1-2 năm chỉ để đạt trình độ N5."
    },
    {
      question: "Học tiếng Nhật ra làm gì?",
      answer: "Hai ngành nghề chính khi học ngoại ngữ đó là biên phiên dịch và dạy học, mở rộng từ hai ngành nghề này, các bạn có thể làm nhà ngoại giao, nhà nghiên cứu về ngôn ngữ, về kinh tế, về thương mại. Tuy nhiên không chỉ có trong hai ngành nghề này, thực tế bạn có thể làm bất cứ nghề nào khi có thêm trong mình khả năng đọc nghe và hiểu được một ngoại ngữ. Đặc biệt là tiếng Nhật rất cần thiết khi các sản phẩm văn hóa đại chúng từ Nhật Bản, nền kinh tế, đối ngoại Nhật Bản có tác động khá to lớn đối với các nước bao gồm Việt Nam chúng ta."
    },
    {
      question: "Làm thế nào để thanh toán học phí?",
      answer: "Ngay tại Website TNQDO, hoặc khi trao đổi với bộ phận CSKH. Bạn sẽ thấy hướng dẫn chi tiết về việc thanh toán, thấy mã QR để tiện cho việc chuyển khoản. Tùy vào nhu cầu bạn có thể thanh toán toàn bộ khóa học để được giảm ngay 10% tổng hóa đơn cùng nhiều phần quà hấp dẫn. Bạn cũng có thể đóng riêng từng tháng cho phù hợp với nhu cầu của bạn. Ngoài ra khi đi học, nếu chuyên cần tốt các bạn còn sẽ nhận được nhiều ưu đãi khác nữa."
    }
  ];

  return (
    <section id="faq" className="py-20 bg-gradient-to-b from-white to-brand-gray">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-brand-lavender/50 text-brand-navy rounded-full mb-4">
              Hỏi đáp
            </div>
            <h2 className="text-3xl md:text-4xl mb-6">
              Câu Hỏi Thường Gặp
            </h2>
            <p className="text-xl text-muted-foreground">
              Những câu hỏi mà học viên thường quan tâm
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-white rounded-lg px-6 border-2 border-gray-100"
              >
                <AccordionTrigger className="hover:no-underline">
                  <span className="text-left">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
