import { Question, TrueFalseQuestion, Flashcard, MatchingPair } from '../types';

export const LESSON_1_QUESTIONS: Question[] = [
  {
    id: 'b1_c1',
    lessonId: 'bai-1',
    lessonName: 'Bài 1: Một số vấn đề chung về cách mạng tư sản',
    questionNumber: 1,
    question: 'Đầu thế kỉ XVII, ngành công nghiệp phát triển nhất ở nước Anh là',
    options: {
      A: 'luyện kim.',
      B: 'máy hơi nước.',
      C: 'khai thác than.',
      D: 'chế tạo máy móc.'
    },
    correctAnswer: 'A',
    explanation: 'Vào đầu thế kỉ XVII, ngành luyện kim và sản xuất len dạ ở Anh phát triển rất nhanh chóng, đóng vai trò mũi nhọn kinh tế.',
    difficulty: 'easy'
  },
  {
    id: 'b1_c2',
    lessonId: 'bai-1',
    lessonName: 'Bài 1: Một số vấn đề chung về cách mạng tư sản',
    questionNumber: 2,
    question: 'Đẳng cấp thứ ba trong xã hội Pháp trước cách mạng gồm những lực lượng nào?',
    options: {
      A: 'Tư sản, nông dân, bình dân thành thị.',
      B: 'Quý tộc, nông dân, tăng lữ, thợ thủ công.',
      C: 'Tăng lữ, quý tộc và tư sản, nông dân.',
      D: 'Vua, quan lại, tăng lữ, bình dân thành thị.'
    },
    correctAnswer: 'A',
    explanation: 'Đẳng cấp thứ ba gồm tư sản, nông dân và các tầng lớp bình dân thành thị; họ chiếm đa số, chịu mọi thứ thuế nhưng không có quyền chính trị.',
    difficulty: 'easy'
  },
  {
    id: 'b1_c3',
    lessonId: 'bai-1',
    lessonName: 'Bài 1: Một số vấn đề chung về cách mạng tư sản',
    questionNumber: 3,
    question: 'Đến giữa thế kỉ XVIII, miền Bắc của 13 bang thuộc địa Anh ở Bắc Mĩ phổ biến phát triển',
    options: {
      A: 'kinh tế đồn điền.',
      B: 'công trường thủ công.',
      C: 'dệt và làm gốm.',
      D: 'phường hội thủ công.'
    },
    correctAnswer: 'B',
    explanation: 'Ở miền Bắc 13 thuộc địa, các công trường thủ công (luyện kim, đóng tàu, dệt) rất phát triển.',
    difficulty: 'medium'
  },
  {
    id: 'b1_c4',
    lessonId: 'bai-1',
    lessonName: 'Bài 1: Một số vấn đề chung về cách mạng tư sản',
    questionNumber: 4,
    question: 'Đến giữa thế kỉ XVIII, miền Nam của 13 bang thuộc địa Anh ở Bắc Mĩ phổ biến phát triển',
    options: {
      A: 'công thương nghiệp.',
      B: 'đồn điền, trang trại.',
      C: 'luyện kim và đóng tàu.',
      D: 'khai thác dầu mỏ.'
    },
    correctAnswer: 'B',
    explanation: 'Ở miền Nam, kinh tế nông nghiệp đồn điền và trang trại quy mô lớn (sử dụng lao động nô lệ da đen) phát triển phổ biến.',
    difficulty: 'easy'
  },
  {
    id: 'b1_c5',
    lessonId: 'bai-1',
    lessonName: 'Bài 1: Một số vấn đề chung về cách mạng tư sản',
    questionNumber: 5,
    question: 'Từ giữa thế kỉ XVI, nền nông nghiệp Anh có đặc điểm nổi bật nào sau đây?',
    options: {
      A: 'Lạc hậu, manh mún, công cụ lao động thô sơ.',
      B: 'Bị cạnh tranh gay gắt bởi nông nghiệp Pháp.',
      C: 'Phát triển theo hướng sản xuất hàng hóa.',
      D: 'Phát triển mạnh mẽ trong ngành đồn điền cao su.'
    },
    correctAnswer: 'C',
    explanation: 'Từ giữa thế kỉ XVI, nông nghiệp Anh nhanh chóng chuyển hướng sản xuất hàng hóa để phục vụ thị trường len dạ ("rào đất cướp ruộng").',
    difficulty: 'medium'
  },
  {
    id: 'b1_c6',
    lessonId: 'bai-1',
    lessonName: 'Bài 1: Một số vấn đề chung về cách mạng tư sản',
    questionNumber: 6,
    question: 'Mục tiêu chung của các cuộc cách mạng tư sản là',
    options: {
      A: 'lật đổ chế đổ phong kiến, thực dân cùng tàn tích của nó.',
      B: 'lật đổ chế độ phong kiến, cổ đại cùng tàn tích của nó.',
      C: 'tạo điều kiện cho sự phát triển của chế độ phong kiến.',
      D: 'mở đường cho sự phát triển của chủ nghĩa xã hội.'
    },
    correctAnswer: 'A',
    explanation: 'Mục tiêu chung: lật đổ chế độ phong kiến, thực dân cùng tàn tích của nó, thiết lập nền thống trị tư sản và mở đường cho CNTB.',
    difficulty: 'easy'
  },
  {
    id: 'b1_c7',
    lessonId: 'bai-1',
    lessonName: 'Bài 1: Một số vấn đề chung về cách mạng tư sản',
    questionNumber: 7,
    question: 'Các cuộc cách mạng tư sản có hai nhiệm vụ cơ bản là',
    options: {
      A: 'dân tộc và dân chủ.',
      B: 'dân tộc và dân sinh.',
      C: 'độc lập và tự do.',
      D: 'dân chủ và dân quyền.'
    },
    correctAnswer: 'A',
    explanation: 'Hai nhiệm vụ cơ bản của cách mạng tư sản là: Nhiệm vụ dân tộc (thống nhất thị trường, giành độc lập) và Nhiệm vụ dân chủ (xóa bỏ chế độ phong kiến, trao quyền tự do dân chủ).',
    difficulty: 'easy'
  },
  {
    id: 'b1_c8',
    lessonId: 'bai-1',
    lessonName: 'Bài 1: Một số vấn đề chung về cách mạng tư sản',
    questionNumber: 8,
    question: 'Một trong những lực lượng lãnh đạo chủ yếu của các cuộc cách mạng tư sản là giai cấp',
    options: {
      A: 'tư sản.',
      B: 'công nhân.',
      C: 'nông dân.',
      D: 'địa chủ.'
    },
    correctAnswer: 'A',
    explanation: 'Giai cấp tư sản là lực lượng lãnh đạo chủ yếu của các cuộc cách mạng tư sản cận đại (có thể liên minh với quý tộc mới hoặc chủ nô).',
    difficulty: 'easy'
  },
  {
    id: 'b1_c9',
    lessonId: 'bai-1',
    lessonName: 'Bài 1: Một số vấn đề chung về cách mạng tư sản',
    questionNumber: 9,
    question: 'Lãnh đạo của cuộc cách mạng tư sản Anh thế kỉ XVII là',
    options: {
      A: 'tư sản và chủ nô.',
      B: 'tư sản và quý tộc mới.',
      C: 'tăng lữ và quý tộc.',
      D: 'Chủ nô và quý tộc.'
    },
    correctAnswer: 'B',
    explanation: 'Tại Anh, cách mạng do liên minh giai cấp tư sản và tầng lớp quý tộc mới (đại diện tiêu biểu là O-li-vơ Crôm-oen) lãnh đạo.',
    difficulty: 'easy'
  },
  {
    id: 'b1_c10',
    lessonId: 'bai-1',
    lessonName: 'Bài 1: Một số vấn đề chung về cách mạng tư sản',
    questionNumber: 10,
    question: '“Lật đổ chế độ phong kiến đứng đầu là vua Sác- lơ I, thiết lập nền thống trị của giai cấp tư sản và quý tộc mới, mở đường cho sự phát triển của chủ nghĩa tư bản” là mục tiêu của cuộc cách mạng tư sản ở quốc gia nào sau đây?',
    options: {
      A: 'Nga.',
      B: 'Pháp.',
      C: 'Anh.',
      D: 'Bắc Mỹ.'
    },
    correctAnswer: 'C',
    explanation: 'Vua Sác-lơ I (Charles I) là vị vua phong kiến chuyên chế nước Anh bị xử tử năm 1649 trong cuộc CMTS Anh.',
    difficulty: 'easy'
  },
  {
    id: 'b1_c11',
    lessonId: 'bai-1',
    lessonName: 'Bài 1: Một số vấn đề chung về cách mạng tư sản',
    questionNumber: 11,
    question: 'Một trong những ý nghĩa của cách mạng tư sản Pháp cuối thế kỷ XVIII là',
    options: {
      A: 'lật đổ và xóa bỏ tàn dư của chế độ phong kiến.',
      B: 'thúc đẩy phong trào đấu tranh giành độc lập Mĩ Latinh.',
      C: 'lật đổ chế độ quân chủ chuyên chế do vua Sác – lơ I đứng đầu.',
      D: 'lật đổ sự thống trị của thực dân Anh, giành độc lập dân tộc.'
    },
    correctAnswer: 'A',
    explanation: 'Cách mạng tư sản Pháp cuối thế kỷ XVIII đã lật đổ và xóa bỏ triệt để tàn dư chế độ phong kiến, đưa giai cấp tư sản lên nắm quyền.',
    difficulty: 'medium'
  },
  {
    id: 'b1_c12',
    lessonId: 'bai-1',
    lessonName: 'Bài 1: Một số vấn đề chung về cách mạng tư sản',
    questionNumber: 12,
    question: 'Cách mạng tư sản Anh thế kỉ XVII đã',
    options: {
      A: 'lật đổ chế độ thuộc địa nửa phong kiến.',
      B: 'thiết lập chế độ dân chủ cộng hòa ở Anh.',
      C: 'thiết lập chế độ quân chủ lập hiến ở Anh.',
      D: 'giành độc lập dân tộc từ tay thực dân Pháp.'
    },
    correctAnswer: 'C',
    explanation: 'Sau sự biến năm 1688, nước Anh đã thiết lập thể chế Quân chủ lập hiến duy trì đến tận ngày nay.',
    difficulty: 'medium'
  },
  {
    id: 'b1_c13',
    lessonId: 'bai-1',
    lessonName: 'Bài 1: Một số vấn đề chung về cách mạng tư sản',
    questionNumber: 13,
    question: 'Một trong những nhiệm vụ của các cuộc cách mạng tư sản là',
    options: {
      A: 'đưa giai cấp công nhân lên nắm quyền.',
      B: 'xóa bỏ triệt để mâu thuẫn trong xã hội.',
      C: 'xác lập sự thống trị của chủ nghĩa thực dân.',
      D: 'xóa bỏ tình trạng phong kiến cát cứ.'
    },
    correctAnswer: 'D',
    explanation: 'Nhiệm vụ dân tộc của cách mạng tư sản bao gồm xóa bỏ cát cứ phong kiến, thống nhất thị trường dân tộc thành một thể thống nhất.',
    difficulty: 'medium'
  },
  {
    id: 'b1_c14',
    lessonId: 'bai-1',
    lessonName: 'Bài 1: Một số vấn đề chung về cách mạng tư sản',
    questionNumber: 14,
    question: 'Đặc điểm nổi bật của tình hình chính trị nước Anh và Pháp trước khi bùng nổ cách mạng tư sản là',
    options: {
      A: 'tồn tại chế độ quân chủ chuyên chế.',
      B: 'là thuộc địa của chủ nghĩa thực dân.',
      C: 'xuất hiện kinh tế tư bản chủ nghĩa.',
      D: 'xuất hiện trào lưu triết học ánh sáng.'
    },
    correctAnswer: 'A',
    explanation: 'Về chính trị, cả Anh và Pháp trước cách mạng đều duy trì chế độ quân chủ chuyên chế (vua nắm mọi quyền lực độc đoán).',
    difficulty: 'easy'
  },
  {
    id: 'b1_c15',
    lessonId: 'bai-1',
    lessonName: 'Bài 1: Một số vấn đề chung về cách mạng tư sản',
    questionNumber: 15,
    question: 'Nội dung nào sau đây không phải là đặc điểm tình hình nước Pháp cuối thế kỉ XVIII?',
    options: {
      A: 'Lấy Thanh giáo làm ngọn cờ tư tưởng.',
      B: 'Xuất hiện trào lưu Triết học ánh sáng.',
      C: 'Xã hội phân chia thành các đẳng cấp.',
      D: 'Vua Lu-i XVI có quyền lực tuyệt đối.'
    },
    correctAnswer: 'A',
    explanation: 'Thanh giáo là ngọn cờ tư tưởng trong CMTS Anh. Nước Pháp cuối thế kỉ XVIII chuẩn bị tư tưởng bằng Trào lưu Triết học Ánh sáng.',
    difficulty: 'medium'
  },
  {
    id: 'b1_c16',
    lessonId: 'bai-1',
    lessonName: 'Bài 1: Một số vấn đề chung về cách mạng tư sản',
    questionNumber: 16,
    question: 'Lãnh đạo các cuộc cách mạng tư sản không bao gồm lực lượng nào sau đây?',
    options: {
      A: 'tư sản.',
      B: 'quý tộc mới.',
      C: 'chủ nô.',
      D: 'công nhân.'
    },
    correctAnswer: 'D',
    explanation: 'Giai cấp công nhân thời cận đại là động lực của cách mạng tư sản, không phải lực lượng lãnh đạo.',
    difficulty: 'easy'
  },
  {
    id: 'b1_c17',
    lessonId: 'bai-1',
    lessonName: 'Bài 1: Một số vấn đề chung về cách mạng tư sản',
    questionNumber: 17,
    question: 'Nội dung nào sau đây không phải là mục tiêu của các cuộc cách mạng tư sản?',
    options: {
      A: 'Lật đổ chế độ phong kiến, thực dân cùng tàn tích của nó.',
      B: 'Tạo điều kiện cho sự phát triển của kinh tế tư bản chủ nghĩa.',
      C: 'Thiết lập nền thống trị của giai cấp tư sản và liên minh của họ.',
      D: 'Mở ra thời đại thời đại thắng lợi của chế độ xã hội chủ nghĩa.'
    },
    correctAnswer: 'D',
    explanation: 'Mở ra thời đại thắng lợi của CNXH là ý nghĩa của Cách mạng tháng Mười Nga 1917, không phải mục tiêu CMTS.',
    difficulty: 'easy'
  },
  {
    id: 'b1_c18',
    lessonId: 'bai-1',
    lessonName: 'Bài 1: Một số vấn đề chung về cách mạng tư sản',
    questionNumber: 18,
    question: 'Nội dung nào sau đây là mục tiêu của cuộc cách mạng tư sản Pháp cuối thế kỉ XVIII?',
    options: {
      A: 'Lật đổ chế độ phong kiến đứng đầu vua Sác- lơ I.',
      B: 'Lật đổ ách thống trị của thực dân Anh, giành độc lập.',
      C: 'Lật đổ chế độ phong kiến đứng đầu vua Lu- i XVI.',
      D: 'Thiết lập chính quyền của giai cấp tư sản và chủ nô.'
    },
    correctAnswer: 'C',
    explanation: 'Cách mạng tư sản Pháp nhằm lật đổ chế độ quân chủ chuyên chế của triều đình phong kiến vua Lu-i XVI.',
    difficulty: 'easy'
  },
  {
    id: 'b1_c19',
    lessonId: 'bai-1',
    lessonName: 'Bài 1: Một số vấn đề chung về cách mạng tư sản',
    questionNumber: 19,
    question: 'Một trong những điểm chung của các cuộc cách mạng tư sản thời cận đại là',
    options: {
      A: 'mở đường cho chủ nghĩa tư bản phát triển.',
      B: 'do tư sản và chủ nô lãnh đạo.',
      C: 'xóa bỏ chế độ phong kiến và nô lệ.',
      D: 'Diễn ra dưới hình thức nội chiến.'
    },
    correctAnswer: 'A',
    explanation: 'Điểm chung xuyên suốt của mọi cuộc cách mạng tư sản là dọn đường và mở đường cho kinh tế tư bản chủ nghĩa phát triển.',
    difficulty: 'easy'
  },
  {
    id: 'b1_c20',
    lessonId: 'bai-1',
    lessonName: 'Bài 1: Một số vấn đề chung về cách mạng tư sản',
    questionNumber: 20,
    question: 'Điểm khác biệt về tình hình chính trị Bắc Mĩ so với nước Anh và Pháp trước khi cách mạng tư sản bùng nổ thế kỉ XVIII là',
    options: {
      A: 'thực dân phương Tây thống trị.',
      B: 'chế độ phong kiến kìm hãm.',
      C: 'xuất hiện tầng lớp quí tộc mới.',
      D: 'xã hội tồn tại chế độ đẳng cấp.'
    },
    correctAnswer: 'A',
    explanation: '13 bang Bắc Mĩ chịu ách thống trị của chính quốc thực dân Anh, trong khi ở Anh và Pháp là nhà nước phong kiến quân chủ trong nước.',
    difficulty: 'medium'
  },
  {
    id: 'b1_c21',
    lessonId: 'bai-1',
    lessonName: 'Bài 1: Một số vấn đề chung về cách mạng tư sản',
    questionNumber: 21,
    question: 'Điểm chung trong tiền đề tư tưởng của các cuộc cách mạng tư sản là',
    options: {
      A: 'Xuất hiện trào lưu tư tưởng tiến bộ của tư sản.',
      B: 'Xuất hiện trào lưu triết học ánh sáng.',
      C: 'Xuất hiện các giai cấp, tầng lớp xã hội mới.',
      D: 'Xuất hiện trào lưu xã hội không tưởng.'
    },
    correctAnswer: 'A',
    explanation: 'Tiền đề tư tưởng của các cuộc CMTS đều là sự xuất hiện các tư tưởng tiến bộ đại diện cho hệ tư tưởng tư sản (như Thanh giáo ở Anh, Triết học Ánh sáng ở Pháp).',
    difficulty: 'medium'
  },
  {
    id: 'b1_c22',
    lessonId: 'bai-1',
    lessonName: 'Bài 1: Một số vấn đề chung về cách mạng tư sản',
    questionNumber: 22,
    question: 'Các cuộc cách mạng tư sản thời cận đại đều',
    options: {
      A: 'dẫn đến xác lập quan hệ sản xuất tư bản chủ nghĩa.',
      B: 'tạo ra một nền dân chủ, tự do thực sự, rộng rãi.',
      C: 'lật đổ chế độ phong kiến, thiết lập nền cộng hòa.',
      D: 'lật đổ chế độ thực dân, thiết lập nền cộng hòa.'
    },
    correctAnswer: 'A',
    explanation: 'Kết quả chung tất yếu của các cuộc CMTS thời cận đại là xác lập quan hệ sản xuất TBCN và thúc đẩy lực lượng sản xuất tiến bộ.',
    difficulty: 'medium'
  },
  {
    id: 'b1_c23',
    lessonId: 'bai-1',
    lessonName: 'Bài 1: Một số vấn đề chung về cách mạng tư sản',
    questionNumber: 23,
    question: 'Nội dung nào phản ánh không đúng về nhiệm vụ dân chủ trong các cuộc cách mạng tư sản thời cận đại?',
    options: {
      A: 'Xóa bỏ chế độ phong kiến chuyên chế.',
      B: 'Xác lập nền dân chủ tư sản.',
      C: 'Đem lại quyền tự do chính trị cho người dân.',
      D: 'Thống nhất thị trường dân tộc.'
    },
    correctAnswer: 'D',
    explanation: '"Thống nhất thị trường dân tộc" thuộc về NHIỆM VỤ DÂN TỘC, không phải nhiệm vụ dân chủ.',
    difficulty: 'hard'
  }
];

export const LESSON_2_QUESTIONS: Question[] = [
  {
    id: 'b2_c1',
    lessonId: 'bai-2',
    lessonName: 'Bài 2: Sự xác lập và phát triển của chủ nghĩa tư bản',
    questionNumber: 1,
    question: 'Đầu thế kỉ XIX, các nước Mĩ Latinh giành độc lập từ tay thực dân',
    options: {
      A: 'Tây Ban Nha và Bồ Đào Nha.',
      B: 'Anh và đế quốc Mĩ.',
      C: 'Tây Ban Nha và Pháp.',
      D: 'Pháp và Đức.'
    },
    correctAnswer: 'A',
    explanation: 'Đầu thế kỉ XIX, phong trào giải phóng dân tộc ở Mĩ Latinh đã bùng nổ, lật đổ ách thống trị thực dân Tây Ban Nha và Bồ Đào Nha.',
    difficulty: 'easy'
  },
  {
    id: 'b2_c2',
    lessonId: 'bai-2',
    lessonName: 'Bài 2: Sự xác lập và phát triển của chủ nghĩa tư bản',
    questionNumber: 2,
    question: 'Chủ nghĩa tư bản hiện đại là thuật ngữ dùng để chỉ giai đoạn phát triển của chủ nghĩa tư bản',
    options: {
      A: 'trong giai đoạn tự do cạnh tranh.',
      B: 'bắt đầu chuyển sang giai đoạn độc quyền.',
      C: 'từ sau chiến tranh thế giới thứ II đến nay.',
      D: 'Từ sau chiến tranh thế giới thứ I đến nay.'
    },
    correctAnswer: 'C',
    explanation: 'Chủ nghĩa tư bản hiện đại là thuật ngữ chỉ giai đoạn phát triển của CNTB từ sau Chiến tranh thế giới thứ hai (1945) đến nay.',
    difficulty: 'easy'
  },
  {
    id: 'b2_c3',
    lessonId: 'bai-2',
    lessonName: 'Bài 2: Sự xác lập và phát triển của chủ nghĩa tư bản',
    questionNumber: 3,
    question: 'Một trong những thách thức mà chủ nghĩa tư bản hiện đại phải đối mặt là',
    options: {
      A: 'tiềm ẩn nguy cơ khủng hoảng tài chính mang tính toàn cầu.',
      B: 'sức sản xuất của các ngành kinh tế ngày càng cao.',
      C: 'khoa học công nghệ phát triển và ngày càng mở rộng.',
      D: 'lực lượng lao động có chất lượng ngày càng cao.'
    },
    correctAnswer: 'A',
    explanation: 'Chủ nghĩa tư bản hiện đại luôn tiềm ẩn nguy cơ khủng hoảng kinh tế, tài chính mang tính toàn cầu (như khủng hoảng 2008).',
    difficulty: 'medium'
  },
  {
    id: 'b2_c4',
    lessonId: 'bai-2',
    lessonName: 'Bài 2: Sự xác lập và phát triển của chủ nghĩa tư bản',
    questionNumber: 4,
    question: 'Chủ nghĩa tư bản được xác lập đầu tiên trên thế giới ở',
    options: {
      A: 'Châu Âu và Bắc Mĩ.',
      B: 'Tây Âu và Châu Á.',
      C: 'Bắc Mĩ và Nam Á.',
      D: 'Châu Á và Châu Phi.'
    },
    correctAnswer: 'A',
    explanation: 'Chủ nghĩa tư bản được hình thành và xác lập đầu tiên ở các quốc gia Châu Âu và Bắc Mĩ.',
    difficulty: 'easy'
  },
  {
    id: 'b2_c5',
    lessonId: 'bai-2',
    lessonName: 'Bài 2: Sự xác lập và phát triển của chủ nghĩa tư bản',
    questionNumber: 5,
    question: 'Sự kiện đánh dấu sự mở rộng của cuộc cách mạng tư sản bên ngoài châu Âu là',
    options: {
      A: 'Cách mạng tư sản Anh.',
      B: 'Các mạng tư sản Pháp.',
      C: 'Cách mạng tư sản Hà Lan.',
      D: 'Chiến tranh giành độc lập ở Bắc Mĩ.'
    },
    correctAnswer: 'D',
    explanation: 'Chiến tranh giành độc lập của 13 thuộc địa Anh ở Bắc Mĩ (1775 - 1783) đã đánh dấu sự mở rộng CMTS ra ngoài phạm vi châu Âu.',
    difficulty: 'easy'
  },
  {
    id: 'b2_c6',
    lessonId: 'bai-2',
    lessonName: 'Bài 2: Sự xác lập và phát triển của chủ nghĩa tư bản',
    questionNumber: 6,
    question: 'Sự xác lập của chủ nghĩa tư bản ở châu Âu và Bắc Mĩ thế kỉ XVII – XIX có điểm chung là',
    options: {
      A: 'thiết lập chế độ quân chủ lập hiến.',
      B: 'thiết lập chế độ cộng hòa.',
      C: 'lật đổ chế độ thực dân.',
      D: 'do giai cấp tư sản lãnh đạo.'
    },
    correctAnswer: 'D',
    explanation: 'Sự xác lập của CNTB ở cả hai khu vực đều do giai cấp tư sản đóng vai trò lãnh đạo hoặc liên minh lãnh đạo.',
    difficulty: 'easy'
  },
  {
    id: 'b2_c7',
    lessonId: 'bai-2',
    lessonName: 'Bài 2: Sự xác lập và phát triển của chủ nghĩa tư bản',
    questionNumber: 7,
    question: 'Sự khác biệt giữa chủ nghĩa tư bản tự do cạnh tranh và chủ nghĩa tư bản độc quyền xuất phát từ',
    options: {
      A: 'sự phát triển kinh tế và công nghiệp.',
      B: 'Sự cạnh tranh và chiến lược kinh doanh.',
      C: 'Sự bất ổn định, phân hóa giàu nghèo.',
      D: 'Sự tập trung tài sản và quyền lực.'
    },
    correctAnswer: 'D',
    explanation: 'Chủ nghĩa tư bản độc quyền hình thành do sự tích tụ và tập trung sản xuất, tài sản và quyền lực kinh tế vào tay các tổ chức độc quyền lớn.',
    difficulty: 'hard'
  },
  {
    id: 'b2_c8',
    lessonId: 'bai-2',
    lessonName: 'Bài 2: Sự xác lập và phát triển của chủ nghĩa tư bản',
    questionNumber: 8,
    question: 'Từ đầu thế kỉ XIX, để đáp ứng nhu cầu ngày càng cao về nguyên liệu và nhân công, các nước tư bản phương Tây đã tăng cường',
    options: {
      A: 'hợp tác và mở rộng đầu tư.',
      B: 'thu hút vốn đầu tư bên ngoài.',
      C: 'xâm lược và mở rộng thuộc địa.',
      D: 'đổi mới hình thức kinh doanh.'
    },
    correctAnswer: 'C',
    explanation: 'Các nước tư bản phương Tây đẩy mạnh xâm lược, bóc lột và mở rộng hệ thống thuộc địa ở Á, Phi và Mĩ Latinh.',
    difficulty: 'easy'
  },
  {
    id: 'b2_c9',
    lessonId: 'bai-2',
    lessonName: 'Bài 2: Sự xác lập và phát triển của chủ nghĩa tư bản',
    questionNumber: 9,
    question: 'Cuối thế kỉ XIX – đầu thế kỉ XX, các nước tư bản chủ nghĩa đã chuyển sang giai đoạn',
    options: {
      A: 'tự do cạnh tranh.',
      B: 'cải cách đất nước.',
      C: 'đế quốc chủ nghĩa.',
      D: 'chủ nghĩa phát xít.'
    },
    correctAnswer: 'C',
    explanation: 'Vào cuối thế kỉ XIX - đầu thế kỉ XX, CNTB tự do cạnh tranh chuyển sang giai đoạn độc quyền, hay còn gọi là giai đoạn đế quốc chủ nghĩa.',
    difficulty: 'easy'
  },
  {
    id: 'b2_c10',
    lessonId: 'bai-2',
    lessonName: 'Bài 2: Sự xác lập và phát triển của chủ nghĩa tư bản',
    questionNumber: 10,
    question: 'Chủ nghĩa đế quốc ra đời từ cuối thế kỉ XIX đầu thế kỉ XX là hệ quả trực tiếp của quá trình',
    options: {
      A: 'xâm lược thuộc địa.',
      B: 'giao lưu buôn bán.',
      C: 'toàn cầu hóa.',
      D: 'hợp tác kinh tế.'
    },
    correctAnswer: 'A',
    explanation: 'Chủ nghĩa đế quốc gắn liền với sự phân chia thị trường thế giới và hệ quả trực tiếp từ quá trình xâm lược mở rộng thuộc địa.',
    difficulty: 'medium'
  },
  {
    id: 'b2_c11',
    lessonId: 'bai-2',
    lessonName: 'Bài 2: Sự xác lập và phát triển của chủ nghĩa tư bản',
    questionNumber: 11,
    question: 'Cho đến cuối thế kỉ XIX, các nước đế quốc chủ nghĩa đã thiết lập hệ thống thuộc địa rộng khắp ở',
    options: {
      A: 'châu Âu, châu Mỹ và khu vực Tây Âu.',
      B: 'châu Âu, châu Úc và khu vực Bắc Mỹ.',
      C: 'châu Á, châu Phi và khu vực Mỹ La-tinh.',
      D: 'châu Mỹ, Tây Âu và khu vực Đông Âu.'
    },
    correctAnswer: 'C',
    explanation: 'Các lục địa Á, Phi và Mỹ La-tinh trở thành mục tiêu chính bị biến thành thuộc địa, nửa thuộc địa hoặc phụ thuộc.',
    difficulty: 'easy'
  },
  {
    id: 'b2_c12',
    lessonId: 'bai-2',
    lessonName: 'Bài 2: Sự xác lập và phát triển của chủ nghĩa tư bản',
    questionNumber: 12,
    question: 'Đầu thế kỉ XX, quốc gia nào sau đây có hệ thống thuộc địa rộng lớn nhất?',
    options: {
      A: 'Đức.',
      B: 'I-ta-li-a.',
      C: 'Nhật',
      D: 'Anh.'
    },
    correctAnswer: 'D',
    explanation: 'Đế quốc Anh sở hữu hệ thống thuộc địa rộng lớn nhất thế giới, chiếm tới 1/4 diện tích và 1/4 dân số địa cầu.',
    difficulty: 'easy'
  },
  {
    id: 'b2_c13',
    lessonId: 'bai-2',
    lessonName: 'Bài 2: Sự xác lập và phát triển của chủ nghĩa tư bản',
    questionNumber: 13,
    question: 'Các tổ chức độc quyền ra đời ở các nước tư bản (từ cuối thế kỉ XIX đầu thế kỉ XX) là kết quả của sự liên minh giữa',
    options: {
      A: 'vô sản và tư sản.',
      B: 'chủ nô và tư sản.',
      C: 'các nhà tư bản lớn.',
      D: 'địa chủ và quý tộc.'
    },
    correctAnswer: 'C',
    explanation: 'Tổ chức độc quyền (Cartel, Syndicate, Trust, Concern) ra đời từ sự liên kết, thỏa thuận giữa các nhà tư bản lớn để thao túng thị trường.',
    difficulty: 'medium'
  },
  {
    id: 'b2_c14',
    lessonId: 'bai-2',
    lessonName: 'Bài 2: Sự xác lập và phát triển của chủ nghĩa tư bản',
    questionNumber: 14,
    question: 'Nội dung nào sau đây là một trong những thách thức của chủ nghĩa tư bản hiện đại?',
    options: {
      A: 'Nguồn nhân công ngày càng cạn kiệt.',
      B: 'Giao lưu kinh tế quốc tế ngày càng tăng.',
      C: 'Mâu thuẫn xã hội ngày càng gia tăng.',
      D: 'Sự ra đời các tổ chức liên kết khu vực.'
    },
    correctAnswer: 'C',
    explanation: 'Mâu thuẫn xã hội và sự phân hóa giàu nghèo ngày càng gay gắt, mâu thuẫn giữa tư bản và lao động là thách thức lớn.',
    difficulty: 'easy'
  },
  {
    id: 'b2_c15',
    lessonId: 'bai-2',
    lessonName: 'Bài 2: Sự xác lập và phát triển của chủ nghĩa tư bản',
    questionNumber: 15,
    question: 'Chính sách xâm lược và mở rộng thuộc địa của các nước tư bản nhằm mục đích đáp ứng nhu cầu',
    options: {
      A: 'phát triển khoa học – kĩ thuật.',
      B: 'giải quyết tình trạng thất nghiệp.',
      C: 'thu hút nguồn vốn đầu tư bên ngoài.',
      D: 'nguyên liệu và nguồn nhân công.'
    },
    correctAnswer: 'D',
    explanation: 'Xâm lược thuộc địa nhằm vơ vét tài nguyên nguyên liệu, tận dụng nguồn nhân công rẻ mạt và mở rộng thị trường tiêu thụ.',
    difficulty: 'easy'
  },
  {
    id: 'b2_c16',
    lessonId: 'bai-2',
    lessonName: 'Bài 2: Sự xác lập và phát triển của chủ nghĩa tư bản',
    questionNumber: 16,
    question: 'Nước Anh được mệnh danh là “đế quốc mà Mặt Trời không bao giờ lặn” vì lí do nào sau đây?',
    options: {
      A: 'Nước Anh luôn phải đối mặt với nạn ngoại xâm.',
      B: 'Nước Anh có hệ thống thuộc địa rộng khắp thế giới.',
      C: 'Nguồn vốn đầu tư của nước Anh trải khắp toàn cầu.',
      D: 'Các nước đế quốc tranh nhau đầu tư vào nước Anh.'
    },
    correctAnswer: 'B',
    explanation: 'Nước Anh có hệ thống thuộc địa trải khắp các châu lục và các múi giờ, mặt trời luôn chiếu sáng trên một phần lãnh thổ thuộc địa Anh.',
    difficulty: 'easy'
  },
  {
    id: 'b2_c17',
    lessonId: 'bai-2',
    lessonName: 'Bài 2: Sự xác lập và phát triển của chủ nghĩa tư bản',
    questionNumber: 17,
    question: 'Cuộc Duy Tân Minh Trị (1868) ở Nhật Bản và cuộc cách mạng Tân Hợi (1911) ở Trung Quốc có điểm tương đồng nào sau đây?',
    options: {
      A: 'Là cuộc cách mạng dân chủ tư sản triệt để.',
      B: 'Mở đường cho chủ nghĩa tư bản phát triển.',
      C: 'Là những cuộc chiến tranh giải phóng dân tộc.',
      D: 'Giải quyết vấn đề ruộng đất cho nông dân.'
    },
    correctAnswer: 'B',
    explanation: 'Cả hai sự kiện đều mang tính chất cách mạng tư sản, mở đường cho quan hệ sản xuất tư bản chủ nghĩa phát triển ở châu Á.',
    difficulty: 'medium'
  },
  {
    id: 'b2_c18',
    lessonId: 'bai-2',
    lessonName: 'Bài 2: Sự xác lập và phát triển của chủ nghĩa tư bản',
    questionNumber: 18,
    question: 'Cuộc Duy tân Minh Trị từ năm 1868 ở Nhật Bản đã',
    options: {
      A: 'đặt nền móng cho xây dựng chủ nghĩa xã hội ở Nhật Bản.',
      B: 'đưa Nhật Bản mở rộng ảnh hưởng sang châu Âu và châu Phi.',
      C: 'đưa Nhật Bản từ nước phong kiến thành nước tư bản chủ nghĩa.',
      D: 'giúp Nhật Bản đạt được nhiều tiến bộ về nghiên cứu hải dương.'
    },
    correctAnswer: 'C',
    explanation: 'Cuộc Duy tân Minh Trị đã biến Nhật Bản từ một quốc gia phong kiến lạc hậu thành một cường quốc tư bản chủ nghĩa phát triển.',
    difficulty: 'easy'
  },
  {
    id: 'b2_c19',
    lessonId: 'bai-2',
    lessonName: 'Bài 2: Sự xác lập và phát triển của chủ nghĩa tư bản',
    questionNumber: 19,
    question: 'Cuối thế kỉ XIX, hầu hết các quốc gia ở châu Á đều trở thành thuộc của thực dân phương Tây, ngoại trừ',
    options: {
      A: 'Xiêm và Nhật Bản.',
      B: 'Nhật Bản và Trung Quốc.',
      C: 'Trung Quốc và Xiêm.',
      D: 'Ấn Độ và Xiêm.'
    },
    correctAnswer: 'A',
    explanation: 'Nhật Bản giữ được độc lập nhờ cải cách Duy tân Minh Trị; Xiêm (Thái Lan) giữ được nền độc lập nhờ chính sách ngoại giao khôn khéo.',
    difficulty: 'easy'
  },
  {
    id: 'b2_c20',
    lessonId: 'bai-2',
    lessonName: 'Bài 2: Sự xác lập và phát triển của chủ nghĩa tư bản',
    questionNumber: 20,
    question: 'Cuối thế kỉ XIX, sự tập trung sản xuất và tích tụ cao độ đã đưa chủ nghĩa tư bản chuyển sang giai đoạn',
    options: {
      A: 'độc quyền.',
      B: 'tự do cạnh tranh.',
      C: 'hòa hoãn.',
      D: 'hợp tác.'
    },
    correctAnswer: 'A',
    explanation: 'Tập trung sản xuất và tích tụ tư bản cao độ đưa CNTB chuyển sang giai đoạn độc quyền (đế quốc chủ nghĩa).',
    difficulty: 'easy'
  },
  {
    id: 'b2_c21',
    lessonId: 'bai-2',
    lessonName: 'Bài 2: Sự xác lập và phát triển của chủ nghĩa tư bản',
    questionNumber: 21,
    question: 'Lĩnh vực nào sau đây là tiềm năng phát triển của chủ nghĩa tư bản hiện đại?',
    options: {
      A: 'Chạy đua vũ trang.',
      B: 'Sự bình đẳng xã hội.',
      C: 'Cơ cấu giai cấp xã hội.',
      D: 'Khoa học – công nghệ.'
    },
    correctAnswer: 'D',
    explanation: 'Tiềm năng phát triển nổi bật của CNTB hiện đại là khả năng đón đầu và ứng dụng mạnh mẽ các thành tựu khoa học - công nghệ tiên tiến.',
    difficulty: 'medium'
  },
  {
    id: 'b2_c22',
    lessonId: 'bai-2',
    lessonName: 'Bài 2: Sự xác lập và phát triển của chủ nghĩa tư bản',
    questionNumber: 22,
    question: 'Nội dung nào sau đây tạo cơ sở cho bước chuyển biến của chủ nghĩa tư bản từ tự do cạnh tranh sang giai đoạn độc quyền?',
    options: {
      A: 'Quá trình hợp tác ở các nước tư bản.',
      B: 'Sự phát triển của các tổ chức độc quyền.',
      C: 'Nhiều trung tâm kinh tế - tài chính ra đời.',
      D: 'Sự ra đời nhiều tổ chức liên kết khu vực.'
    },
    correctAnswer: 'B',
    explanation: 'Sự xuất hiện và lớn mạnh chi phối nền kinh tế của các tổ chức độc quyền là nền tảng cho bước chuyển này.',
    difficulty: 'medium'
  },
  {
    id: 'b2_c23',
    lessonId: 'bai-2',
    lessonName: 'Bài 2: Sự xác lập và phát triển của chủ nghĩa tư bản',
    questionNumber: 23,
    question: 'Sự phát triển của chủ nghĩa tư bản diễn ra theo trình tự nào sau đây?',
    options: {
      A: 'CNTB tự do cạnh tranh => CNTB độc quyền => CNTB hiện đại.',
      B: 'CNTB độc quyền => CNTB hiện đại => CNTB tự do cạnh tranh.',
      C: 'CNTB tự do cạnh tranh => CNTB hiện đại => CNTB độc quyền.',
      D: 'CNTB hiện đại => CNTB độc quyền => CNTB tự do cạnh tranh.'
    },
    correctAnswer: 'A',
    explanation: 'Tiến trình lịch sử phát triển của CNTB: CNTB tự do cạnh tranh -> CNTB độc quyền -> CNTB hiện đại (sau CTTG II đến nay).',
    difficulty: 'easy'
  }
];

export const LESSON_3_QUESTIONS: Question[] = [
  {
    id: 'b3_c1',
    lessonId: 'bai-3',
    lessonName: 'Bài 3: Sự hình thành Liên bang Cộng hòa Xã hội Chủ nghĩa Xô Viết',
    questionNumber: 1,
    question: 'Sau cách mạng tháng Hai năm 1917, giai cấp tư sản ở nước Nga đã thành lập',
    options: {
      A: 'Chính phủ tư sản lâm thời.',
      B: 'Chính phủ dân tộc dân chủ.',
      C: 'Chính quyền Xô viết.',
      D: 'Chính phủ dân chủ cộng hòa.'
    },
    correctAnswer: 'A',
    explanation: 'Giai cấp tư sản đã thành lập Chính phủ tư sản lâm thời đại diện cho quyền lợi của giai cấp bóc lột.',
    difficulty: 'easy'
  },
  {
    id: 'b3_c2',
    lessonId: 'bai-3',
    lessonName: 'Bài 3: Sự hình thành Liên bang Cộng hòa Xã hội Chủ nghĩa Xô Viết',
    questionNumber: 2,
    question: 'Sau Cách mạng tháng Hai năm 1917, chính quyền cách mạng của quần chúng nhân dân được thiết lập ở nước Nga được gọi là',
    options: {
      A: 'chính phủ tư sản lâm thời.',
      B: 'chính phủ dân tộc dân chủ.',
      C: 'chính quyền Xô viết.',
      D: 'chính phủ dân chủ cộng hòa.'
    },
    correctAnswer: 'C',
    explanation: 'Quần chúng công nhân, nông dân và binh lính đã thành lập các Xô viết đại biểu.',
    difficulty: 'easy'
  },
  {
    id: 'b3_c3',
    lessonId: 'bai-3',
    lessonName: 'Bài 3: Sự hình thành Liên bang Cộng hòa Xã hội Chủ nghĩa Xô Viết',
    questionNumber: 3,
    question: 'Đại hội Xô viết toàn Nga lần thứ hai họp (25/10/1917) đã tuyên bố',
    options: {
      A: 'thành lập chính quyền Xô viết.',
      B: 'tham chiến chống Nhật ở châu Á.',
      C: 'thành lập khối Đồng minh chống phát xít.',
      D: 'thành lập chính phủ tư sản lâm thời.'
    },
    correctAnswer: 'A',
    explanation: 'Đại hội Xô viết toàn Nga lần II họp đêm 25/10/1917 đã long trọng tuyên bố thành lập chính quyền Xô viết do Lê-nin đứng đầu.',
    difficulty: 'easy'
  },
  {
    id: 'b3_c4',
    lessonId: 'bai-3',
    lessonName: 'Bài 3: Sự hình thành Liên bang Cộng hòa Xã hội Chủ nghĩa Xô Viết',
    questionNumber: 4,
    question: 'Ngay sau khi thành lập (1917), chính quyền Xô viết ở Nga do Lê-nin đứng đầu đã',
    options: {
      A: 'ban hành “Sắc lệnh hoà bình” và “Sắc lệnh ruộng đất”.',
      B: 'giúp đỡ các nước xã hội chủ nghĩa xây dựng đất nước.',
      C: 'tiến hành công cuộc cải tổ toàn diện đất nước.',
      D: 'lãnh đạo nhân dân lật đổ chế độ Nga hoàng.'
    },
    correctAnswer: 'A',
    explanation: 'Hai sắc lệnh đầu tiên mang tính lịch sử: "Sắc lệnh hòa bình" (đưa Nga ra khỏi chiến tranh) và "Sắc lệnh ruộng đất" (chia ruộng đất cho nông dân).',
    difficulty: 'easy'
  },
  {
    id: 'b3_c5',
    lessonId: 'bai-3',
    lessonName: 'Bài 3: Sự hình thành Liên bang Cộng hòa Xã hội Chủ nghĩa Xô Viết',
    questionNumber: 5,
    question: 'Quốc gia nào sau đây đã thành lập nhà nước chuyên chính vô sản đầu tiên trên thế giới?',
    options: {
      A: 'Trung Quốc.',
      B: 'Việt Nam.',
      C: 'Liên Xô.',
      D: 'Mĩ.'
    },
    correctAnswer: 'C',
    explanation: 'Nước Nga Xô viết / Liên Xô là nhà nước chuyên chính vô sản đầu tiên trên thế giới.',
    difficulty: 'easy'
  },
  {
    id: 'b3_c6',
    lessonId: 'bai-3',
    lessonName: 'Bài 3: Sự hình thành Liên bang Cộng hòa Xã hội Chủ nghĩa Xô Viết',
    questionNumber: 6,
    question: 'Một trong những quốc gia đầu tiên gia nhập Liên bang Cộng hoà xã hội chủ nghĩa Xô viết năm 1922 là',
    options: {
      A: 'Nga.',
      B: 'Nhật Bản.',
      C: 'Campuchia.',
      D: 'Lào.'
    },
    correctAnswer: 'A',
    explanation: '4 nước Cộng hòa đầu tiên gia nhập Liên bang năm 1922: Nga, U-crai-na, Bê-lô-rút-xi-a và Ngoại Cáp-ca-dơ.',
    difficulty: 'easy'
  },
  {
    id: 'b3_c7',
    lessonId: 'bai-3',
    lessonName: 'Bài 3: Sự hình thành Liên bang Cộng hòa Xã hội Chủ nghĩa Xô Viết',
    questionNumber: 7,
    question: 'Cách mạng tháng Hai năm 1917 ở Nga đã lật đổ',
    options: {
      A: 'chế độ quân chủ chuyên chế.',
      B: 'chế độ độc tài quân sự.',
      C: 'chính phủ tư sản lâm thời.',
      D: 'Chính quyền Xô viết.'
    },
    correctAnswer: 'A',
    explanation: 'Cách mạng tháng Hai năm 1917 đã lật đổ chế độ quân chủ chuyên chế của Nga hoàng Ni-cô-lai II.',
    difficulty: 'easy'
  },
  {
    id: 'b3_c8',
    lessonId: 'bai-3',
    lessonName: 'Bài 3: Sự hình thành Liên bang Cộng hòa Xã hội Chủ nghĩa Xô Viết',
    questionNumber: 8,
    question: 'Năm 1924, Hiến pháp đầu tiên của Liên Xô đã',
    options: {
      A: 'hoàn thành quá trình thành lập nhà nước Liên Xô.',
      B: 'kết thúc cuộc chiến tranh bảo vệ tổ quốc.',
      C: 'giải quyết yêu cầu hòa bình cho nhân dân.',
      D: 'giải quyết vấn đề ruộng đất cho nông dân.'
    },
    correctAnswer: 'A',
    explanation: 'Bản Hiến pháp năm 1924 đã đánh dấu hoàn thành về mặt pháp lý quá trình thành lập Nhà nước Liên bang Cộng hòa Xã hội Chủ nghĩa Xô Viết.',
    difficulty: 'medium'
  },
  {
    id: 'b3_c9',
    lessonId: 'bai-3',
    lessonName: 'Bài 3: Sự hình thành Liên bang Cộng hòa Xã hội Chủ nghĩa Xô Viết',
    questionNumber: 9,
    question: 'Sự ra đời của Liên bang cộng hòa xã hội chủ nghĩa Xô Viết (1922) đã',
    options: {
      A: 'giải phóng các dân tộc trên toàn thế giới.',
      B: 'liên kết phong trào công nhân các nước tư bản.',
      C: 'tạo sức mạnh tổng hợp để xây dựng đất nước.',
      D: 'đập tan âm mưu xâm lược của các nước đế quốc.'
    },
    correctAnswer: 'C',
    explanation: 'Sự hợp nhất tạo ra sức mạnh tổng hợp to lớn về kinh tế, chính trị, quốc phòng để bảo vệ và xây dựng thành công CNXH.',
    difficulty: 'medium'
  },
  {
    id: 'b3_c10',
    lessonId: 'bai-3',
    lessonName: 'Bài 3: Sự hình thành Liên bang Cộng hòa Xã hội Chủ nghĩa Xô Viết',
    questionNumber: 10,
    question: 'Lãnh đạo cách mạng tháng Mười Nga năm 1917 là',
    options: {
      A: 'Các Mác.',
      B: 'Ănghen.',
      C: 'Xtalin.',
      D: 'Lênin.'
    },
    correctAnswer: 'D',
    explanation: 'V.I. Lê-nin và Đảng Bôn-sê-vích Nga trực tiếp lãnh đạo thắng lợi Cách mạng tháng Mười năm 1917.',
    difficulty: 'easy'
  },
  {
    id: 'b3_c11',
    lessonId: 'bai-3',
    lessonName: 'Bài 3: Sự hình thành Liên bang Cộng hòa Xã hội Chủ nghĩa Xô Viết',
    questionNumber: 11,
    question: 'Liên bang Cộng hoà xã hội chủ nghĩa Xô viết được thành lập trong bối cảnh lịch sử nào sau đây?',
    options: {
      A: 'Các nước cộng hòa Xô viết phát triển không đồng đều về kinh tế.',
      B: 'Mâu thuẫn giữa các dân tộc Nga với chế độ Nga hoàng gay gắt.',
      C: 'Các nước cộng hòa Xô Viết có sự thống nhất về chính sách phát triển.',
      D: 'Mâu thuẫn giữa nước Nga với các nước cộng hòa Xô viết gay gắt.'
    },
    correctAnswer: 'A',
    explanation: 'Các nước cộng hòa phát triển không đồng đều về kinh tế, đòi hỏi phải liên minh giúp đỡ lẫn nhau để cùng tiến bộ.',
    difficulty: 'medium'
  },
  {
    id: 'b3_c12',
    lessonId: 'bai-3',
    lessonName: 'Bài 3: Sự hình thành Liên bang Cộng hòa Xã hội Chủ nghĩa Xô Viết',
    questionNumber: 12,
    question: 'Đặc điểm nổi bật của tình hình nước Nga sau cách mạng tháng Hai năm 1917 là',
    options: {
      A: 'hai chính quyền song song tồn tại.',
      B: 'Nhân dân lên nắm chính quyền.',
      C: 'ba chính quyền tồn tại đồng thời.',
      D: 'giai cấp tư sản nắm chính quyền.'
    },
    correctAnswer: 'A',
    explanation: 'Tình trạng độc nhất vô nhị: hai chính quyền cùng song song tồn tại (Chính phủ tư sản lâm thời và các Xô viết công - nông - binh).',
    difficulty: 'easy'
  },
  {
    id: 'b3_c13',
    lessonId: 'bai-3',
    lessonName: 'Bài 3: Sự hình thành Liên bang Cộng hòa Xã hội Chủ nghĩa Xô Viết',
    questionNumber: 13,
    question: 'Mục tiêu của việc thành lập Liên bang Cộng hòa xã hội chủ nghĩa Xô viết là',
    options: {
      A: 'chống lại sự tấn công của 14 nước đế quốc.',
      B: 'thực hiện hiệu quả chính sách kinh tế mới.',
      C: 'hợp tác, giúp đỡ lẫn nhau để cùng phát triển.',
      D: 'chống lại cuộc tấn công của phát xít Đức.'
    },
    correctAnswer: 'C',
    explanation: 'Mục tiêu tối thượng: tập hợp sức mạnh để hợp tác, tương trợ, giúp đỡ lẫn nhau cùng phát triển về mọi mặt.',
    difficulty: 'easy'
  },
  {
    id: 'b3_c14',
    lessonId: 'bai-3',
    lessonName: 'Bài 3: Sự hình thành Liên bang Cộng hòa Xã hội Chủ nghĩa Xô Viết',
    questionNumber: 14,
    question: 'Năm 1917, nước Nga diễn ra hai cuộc cách mạng xã hội đều gắn với sự lãnh đạo của',
    options: {
      A: 'giai cấp tư sản.',
      B: 'giai cấp vô sản.',
      C: 'tiểu tư sản trí thức.',
      D: 'địa chủ phong kiến.'
    },
    correctAnswer: 'B',
    explanation: 'Cả hai cuộc cách mạng (tháng Hai và tháng Mười) đều gắn liền với vai trò tiên phong của giai cấp vô sản và Đảng Bôn-sê-vích.',
    difficulty: 'medium'
  },
  {
    id: 'b3_c15',
    lessonId: 'bai-3',
    lessonName: 'Bài 3: Sự hình thành Liên bang Cộng hòa Xã hội Chủ nghĩa Xô Viết',
    questionNumber: 15,
    question: 'Cách mạng tháng Mười Nga năm 1917 đã',
    options: {
      A: 'lật đổ được Chính phủ tư sản lâm thời.',
      B: 'lật đổ được chế độ quân chủ chuyên chế.',
      C: 'đưa nước Nga ra khỏi cuộc Chiến tranh thế giới.',
      D: 'giải phóng các dân tộc khỏi chế độ tư bản chủ nghĩa.'
    },
    correctAnswer: 'A',
    explanation: 'Cách mạng tháng Mười Nga đã đập tan bộ máy Chính phủ tư sản lâm thời, lập nên chính quyền Xô viết.',
    difficulty: 'easy'
  },
  {
    id: 'b3_c16',
    lessonId: 'bai-3',
    lessonName: 'Bài 3: Sự hình thành Liên bang Cộng hòa Xã hội Chủ nghĩa Xô Viết',
    questionNumber: 16,
    question: 'Năm 1922, Đại hội lần thứ nhất các Xô viết toàn Liên bang đã thông qua',
    options: {
      A: 'Tuyên ngôn thành lập Liên bang Cộng hòa xã hội chủ nghĩa Xô viết.',
      B: 'Hiến pháp đầu tiên của Liên bang Cộng hòa xã hội chủ nghĩa Xô viết.',
      C: 'Cương lĩnh xây dựng đất nước tiến lên chủ nghĩa xã hội.',
      D: 'Báo cáo chính trị và báo cáo sửa đổi điều lệ Đảng Cộng sản.'
    },
    correctAnswer: 'A',
    explanation: 'Đại hội lần I năm 1922 đã thông qua Tuyên ngôn thành lập và Bản hiệp ước thành lập Liên bang Xô viết.',
    difficulty: 'medium'
  },
  {
    id: 'b3_c17',
    lessonId: 'bai-3',
    lessonName: 'Bài 3: Sự hình thành Liên bang Cộng hòa Xã hội Chủ nghĩa Xô Viết',
    questionNumber: 17,
    question: 'Một trong những tư tưởng chỉ đạo của Lê-nin trong việc thành lập Liên bang Cộng hòa xã hội chủ nghĩa Xô viết năm 1922 là',
    options: {
      A: 'sự bình đẳng về mọi mặt.',
      B: 'phân biệt về tôn giáo.',
      C: 'đồng hóa về văn hóa.',
      D: 'phân biệt về chủng tộc.'
    },
    correctAnswer: 'A',
    explanation: 'Nguyên tắc thành lập: tự nguyện, bình đẳng về mọi mặt và tôn trọng quyền tự quyết của các dân tộc.',
    difficulty: 'easy'
  },
  {
    id: 'b3_c18',
    lessonId: 'bai-3',
    lessonName: 'Bài 3: Sự hình thành Liên bang Cộng hòa Xã hội Chủ nghĩa Xô Viết',
    questionNumber: 18,
    question: 'Đối với Liên Xô, sự ra đời của Liên bang Cộng hoà xã hội chủ nghĩa Xô viết không có ý nghĩa nào sau đây?',
    options: {
      A: 'Thể hiện sức mạnh đoàn kết, giúp đỡ nhau giữa các dân tộc Xô viết.',
      B: 'Phù hợp với lợi ích chung của các dân tộc trên đất nước Xô viết.',
      C: 'Tăng cường vị thế của Nhà nước Liên Xô trên trường quốc tế.',
      D: 'Tạo tiền đề cho sự ra đời của hệ thống xã hội chủ nghĩa trên thế giới.'
    },
    correctAnswer: 'D',
    explanation: '"Tạo tiền đề cho sự ra đời của hệ thống XHCN trên thế giới" là ý nghĩa quốc tế (đối với THẾ GIỚI), không phải đối với nội bộ Liên Xô.',
    difficulty: 'hard'
  },
  {
    id: 'b3_c19',
    lessonId: 'bai-3',
    lessonName: 'Bài 3: Sự hình thành Liên bang Cộng hòa Xã hội Chủ nghĩa Xô Viết',
    questionNumber: 19,
    question: 'Nội dung nào sau đây phản ánh đúng sự ra đời của Liên bang Cộng hòa xã hội chủ nghĩa Xô viết năm 1922?',
    options: {
      A: 'Phù hợp với lợi ích chung của các dân tộc trên đất nước Xô viết.',
      B: 'Phù hợp với xu thế phát triển chung của thế giới lúc bấy giờ.',
      C: 'Đáp ứng được nhiệm vụ cấp bách trong đấu tranh chống ngoại xâm.',
      D: 'Chưa phù hợp với nguyện vọng các dân tộc trên đất nước Xô viết.'
    },
    correctAnswer: 'A',
    explanation: 'Sự ra đời của Liên Xô hoàn toàn xuất phát từ nguyện vọng và phù hợp với lợi ích chung của tất cả các dân tộc trên đất nước Xô viết.',
    difficulty: 'medium'
  },
  {
    id: 'b3_c20',
    lessonId: 'bai-3',
    lessonName: 'Bài 3: Sự hình thành Liên bang Cộng hòa Xã hội Chủ nghĩa Xô Viết',
    questionNumber: 20,
    question: 'Đối với thế giới, sự ra đời của Liên bang Cộng hoà xã hội chủ nghĩa Xô viết không có ý nghĩa nào sau đây?',
    options: {
      A: 'Tăng cường vị thế của Nhà nước Liên Xô trên trường quốc tế.',
      B: 'Cổ vũ mạnh mẽ phong trào giải phóng dân tộc trên thế giới.',
      C: 'Để lại nhiều bài học kinh nghiệm quý báu về mô hình nhà nước.',
      D: 'Chứng minh học thuyết Mác – Lênin là đúng đắn, khoa học.'
    },
    correctAnswer: 'A',
    explanation: '"Tăng cường vị thế của Nhà nước Liên Xô trên trường quốc tế" là ý nghĩa ĐỐI VỚI LIÊN XÔ, không phải ý nghĩa đối với thế giới.',
    difficulty: 'hard'
  },
  {
    id: 'b3_c21',
    lessonId: 'bai-3',
    lessonName: 'Bài 3: Sự hình thành Liên bang Cộng hòa Xã hội Chủ nghĩa Xô Viết',
    questionNumber: 21,
    question: 'Khi mới thành lập, Liên bang Cộng hòa xã hội chủ nghĩa Xô viết gồm 4 nước Cộng hòa là',
    options: {
      A: 'Nga, U-crai-na, Bê-lô-rút-xi-a và Ngoại Cáp-ca-dơ.',
      B: 'Nga, Hung-ga-ri, Bê-lô-rút-xi-a và Ngoại Cáp-ca-dơ.',
      C: 'Nga, Hung-ga-ri, Bung-ra-ri và Ngoại Cáp-ca-dơ.',
      D: 'Liên Xô, Hung-ga-ri, Bung-ra-ri và Ngoại Cáp-ca-dơ.'
    },
    correctAnswer: 'A',
    explanation: '4 nước Cộng hòa đầu tiên hợp thành Liên bang Xô Viết năm 1922: Nga, U-crai-na, Bê-lô-rút-xi-a và Ngoại Cáp-ca-dơ.',
    difficulty: 'easy'
  },
  {
    id: 'b3_c22',
    lessonId: 'bai-3',
    lessonName: 'Bài 3: Sự hình thành Liên bang Cộng hòa Xã hội Chủ nghĩa Xô Viết',
    questionNumber: 22,
    question: 'Thắng lợi nào sau đây dẫn đến sự ra đời của Nhà nước xã hội chủ nghĩa đầu tiên trên thế giới?',
    options: {
      A: 'Cách mạng tháng Hai (1917) ở Nga.',
      B: 'Cách mạng tháng Mười Nga (1917).',
      C: 'Cách mạng Nga năm 1905 - 1907.',
      D: 'Công xã Pa-ri năm 1871 ở Pháp.'
    },
    correctAnswer: 'B',
    explanation: 'Cách mạng tháng Mười Nga năm 1917 đã thiết lập Nhà nước xã hội chủ nghĩa đầu tiên trong lịch sử nhân loại.',
    difficulty: 'easy'
  },
  {
    id: 'b3_c23',
    lessonId: 'bai-3',
    lessonName: 'Bài 3: Sự hình thành Liên bang Cộng hòa Xã hội Chủ nghĩa Xô Viết',
    questionNumber: 23,
    question: 'Liên bang Cộng hòa xã hội chủ nghĩa Xô viết ra đời năm 1922 đã',
    options: {
      A: 'đánh dấu Liên Xô hoàn thành công cuộc đấu tranh chống thù trong, giặc ngoài.',
      B: 'chứng tỏ chế độ quân chủ chuyên chế do Nga hoàng dứng đầu hoàn toàn sụp đổ.',
      C: 'đánh dấu sự xác lập chế độ xã hội chủ nghĩa trên toàn lãnh thổ Liên Xô rộng lớn.',
      D: 'đánh dấu Liên Xô đã hoàn thành công cuộc xây dựng chế độ xã hội chủ nghĩa.'
    },
    correctAnswer: 'C',
    explanation: 'Sự ra đời năm 1922 đánh dấu sự xác lập của chế độ XHCN trên toàn bộ vùng lãnh thổ rộng lớn của Liên Xô.',
    difficulty: 'medium'
  }
];

export const TRUE_FALSE_QUESTIONS: TrueFalseQuestion[] = [
  {
    id: 'tf_1',
    questionNumber: 1,
    lessonId: 'bai-1',
    title: 'Tư liệu về Tuyên ngôn Độc lập Mĩ (1776) và Tuyên ngôn Nhân quyền, Dân quyền Pháp (1789)',
    sourceText: `Tư liệu 1: “Tất cả mọi người sinh ra có quyền bình đẳng. Tạo hóa cho họ những quyền không ai có thể xâm phạm được; trong những quyền ấy, có quyền được sống, quyền tự do và quyền mưu cầu hạnh phúc”.\n(Tuyên ngôn Độc lập (Mĩ, năm 1776))\n\nTư liệu 2:\n“Điều 1. Con người sinh ra đều có quyền tự do và bình đẳng. Những sự phân biệt xã hội chỉ có thể dựa trên lợi ích chung.\nĐiều 17. Quyền tư hữu là quyền bất khả xâm phạm và thiêng liêng không ai có thể bị tước bỏ”\n(Tuyên ngôn Nhân quyền và Dân quyền (Pháp, năm 1789))`,
    sourceCitation: 'Tuyên ngôn Độc lập Mĩ 1776 & Tuyên ngôn Nhân quyền và Dân quyền Pháp 1789',
    statements: [
      {
        id: 'a',
        statement: 'Bản Tuyên ngôn Nhân quyền và Dân quyền ra đời từ cuộc cách mạng tư sản Pháp cuối thế kỉ XVIII.',
        isCorrect: true,
        explanation: 'Đúng: Tuyên ngôn Nhân quyền và Dân quyền được Quốc hội Lập hiến Pháp thông qua vào tháng 8/1789 trong cuộc CMTS Pháp.'
      },
      {
        id: 'b',
        statement: 'Điểm chung của Tuyên ngôn Độc lập của nước Mĩ và Tuyên ngôn Nhân quyền và Dân quyền của nước Pháp là đề cao quyền con người và quyền công dân.',
        isCorrect: true,
        explanation: 'Đúng: Cả hai văn kiện đều khẳng định quyền tự nhiên của con người (bình đẳng, tự do, sống, hạnh phúc) và quyền công dân.'
      },
      {
        id: 'c',
        statement: 'Bản Tuyên ngôn Nhân quyền và Dân quyền của nước Pháp năm 1789 không đề cao quyền tư hữu cá nhân vì đó là biểu hiện cho sự phân biệt giàu – nghèo trong xã hội.',
        isCorrect: false,
        explanation: 'Sai: Điều 17 ghi rõ "Quyền tư hữu là quyền bất khả xâm phạm và thiêng liêng không ai có thể bị tước bỏ" — giai cấp tư sản rất đề cao quyền sở hữu tư nhân.'
      },
      {
        id: 'd',
        statement: 'Trong Tuyên ngôn độc lập của nước Việt Nam dân chủ cộng hòa (2/9/1945), chủ tịch Hồ Chí Minh đã trích dẫn những câu nói nổi tiếng trong bản tuyên ngôn Độc lập của nước Mĩ và Tuyên ngôn Nhân quyền và Dân quyền của nước Pháp.',
        isCorrect: true,
        explanation: 'Đúng: Chủ tịch Hồ Chí Minh đã trích dẫn trực tiếp lời bất hủ trong Tuyên ngôn Độc lập 1776 của Mĩ và Tuyên ngôn Nhân quyền 1789 của Pháp.'
      }
    ]
  },
  {
    id: 'tf_2',
    questionNumber: 2,
    lessonId: 'bai-1',
    title: 'Tư liệu về chế độ quân chủ chuyên chế Pháp dưới triều vua Lu-i XVI',
    sourceText: `“Trước cách mạng, Pháp là một nước quân chủ chuyên chế phong kiến. Nhà vua nắm mọi quyền hành, hầu như không chịu một sự kiểm soát nào. Vua có quyền quyết định mọi công việc đối nội và đối ngoại, bổ nhiệm và cách chức các bộ trưởng và nhân viên nhà nước, ban hành và hủy bỏ các đạo luật, trừng phạt và ân xá... Vua Lu-I, XVI thuộc triều đại Buốcbông lên ngôi năm 1774, thường tự coi ý muốn của chính mình là pháp luật và quyền lực của nhà vua là do trời ban cho để trị nước.”\n(Vũ Dương Ninh (chủ biên), Lịch sử thế giới cận đại, NXB Giáo dục, 2006, tr.60)`,
    sourceCitation: 'Vũ Dương Ninh (chủ biên), Lịch sử thế giới cận đại, NXB Giáo dục, 2006, tr.60',
    statements: [
      {
        id: 'a',
        statement: 'Chính sách cai trị của nhà nước phong kiến chuyên chế gây bất mãn cho nhân dân.',
        isCorrect: true,
        explanation: 'Đúng: Quyền lực độc đoán, sưu cao thuế nặng và bóc lột của vua Lu-i XVI đã gây nên làn sóng phẫn nộ, bất mãn sâu sắc trong mọi tầng lớp nhân dân.'
      },
      {
        id: 'b',
        statement: 'Sự tồn tại của nhà nước quân chủ tạo điều kiện cho kinh tế hàng hóa phát triển.',
        isCorrect: false,
        explanation: 'Sai: Chế độ quân chủ phong kiến chuyên chế với thuế quan cát cứ, độc quyền đã kìm hãm nặng nề sự phát triển của kinh tế hàng hóa tư bản chủ nghĩa.'
      },
      {
        id: 'c',
        statement: 'Mâu thuẫn giữa đẳng cấp ba với đẳng cấp tăng lữ và quý tộc ngày càng sâu sắc.',
        isCorrect: true,
        explanation: 'Đúng: Đẳng cấp thứ ba không có quyền hành bị hai đẳng cấp trên áp bức, mâu thuẫn xã hội trở nên vô cùng gay gắt.'
      },
      {
        id: 'd',
        statement: 'Tình hình chính trị ở Pháp dưới triều vua Lu-I XVI khủng hoảng trầm trọng.',
        isCorrect: true,
        explanation: 'Đúng: Nước Pháp lâm vào khủng hoảng chính trị sâu sắc, vua không thể cai trị như cũ và nhân dân không thể sống như trước nữa.'
      }
    ]
  },
  {
    id: 'tf_3',
    questionNumber: 3,
    lessonId: 'bai-2',
    title: 'Tư liệu về chính sách xâm lược thuộc địa thời Napôlêông III (Pháp)',
    sourceText: `“Sau khi lên nắm chính quyền, Napôlêông III tuyên bố “Đế chế là hòa bình”. Nhưng chính sách đối ngoại hoàn toàn trái ngược với lời nói trên. Đế chế II đã tiến hành nhiều cuộc chiến tranh hòng đem lại của cải và nguyên liệu về cho bọn đại tư sản ngân hàng và công nghiệp, đem lại danh vọng và tiền tài cho bọn quân phiệt và muốn nhờ những chiến công bên ngoài để củng cố địa vị thống trị ở trong nước.”\n(Vũ Dương Ninh (chủ biên), Lịch sử thế giới cận đại, NXB Giáo dục, 2006, tr.142 - 143)`,
    sourceCitation: 'Vũ Dương Ninh (chủ biên), Lịch sử thế giới cận đại, NXB Giáo dục, 2006, tr.142 - 143',
    statements: [
      {
        id: 'a',
        statement: 'Chính sách xâm lược thuộc địa của các nước tư bản gây bất mãn cho nhân dân.',
        isCorrect: true,
        explanation: 'Đúng: Chiến tranh xâm lược gây gánh nặng thuế khóa, tổn thất sinh mạng cho nhân dân chính quốc và gây thống khổ cho nhân dân các nước thuộc địa.'
      },
      {
        id: 'b',
        statement: 'Các nước đế quốc xâm lược để tạo điều kiện phát triển kinh tế các nước thuộc địa.',
        isCorrect: false,
        explanation: 'Sai: Mục tiêu xâm lược là để cướp bóc nguyên liệu, chiếm thị trường và bóc lột thuộc địa làm giàu cho tư sản chính quốc, không phải để phát triển kinh tế thuộc địa.'
      },
      {
        id: 'c',
        statement: 'Mâu thuẫn giữa các nước đế quốc về vấn đề thuộc địa ngày càng gay gắt.',
        isCorrect: true,
        explanation: 'Đúng: Sự tranh giành giằng xé hệ thống thuộc địa giữa các cường quốc đế quốc là nguyên nhân dẫn đến các cuộc xung đột và chiến tranh thế giới.'
      },
      {
        id: 'd',
        statement: 'Đối với các nước đế quốc, thuộc địa có tầm quan trọng không đáng kể.',
        isCorrect: false,
        explanation: 'Sai: Thuộc địa là nguồn sống, có ý nghĩa chiến lược sống còn về nguyên liệu, nhân công và thị trường của các nước đế quốc.'
      }
    ]
  },
  {
    id: 'tf_4',
    questionNumber: 4,
    lessonId: 'bai-3',
    title: 'Tư liệu về thắng lợi của Cách mạng tháng Mười Nga và Nhà nước Liên Xô',
    sourceText: `“Thắng lợi của Cách mạng tháng Mười Nga đã dẫn đến sự ra đời của Nhà nước xã hội chủ nghĩa đầu tiên trên thế giới – Liên bang Cộng hòa xã hội chủ nghĩa Xô viết (gọi tắt là Liên Xô), chiếm 1/6 diện tích trái đất. Nằm giữa vòng vây thù địch của chủ nghĩa đế quốc, nhân dân Liên Xô đã kiên cường xây dựng chế độ mới xã hội chủ nghĩa, thu nhiều thành tựu to lớn và liên tiếp đánh bại mọi âm mưu tấn công của chủ nghĩa đế quốc, tiêu biểu là thắng lợi của cuộc chiến tranh vệ quốc chống chủ nghĩa phát xít Đức trong những năm 1941-1945. Chính nhờ đó, sau Chiến tranh thế giới thứ hai, chủ nghĩa xã hội đã vượt ra khỏi phạm vi một nước, bước đầu hình thành một hệ thống thế giới với nhiều nước xã hội chủ nghĩa trên những lục địa khác nhau.”\n(Nguyễn Anh Thái (chủ biên), Lịch sử thế giới hiện đại, NXB Giáo dục, 2000, tr.3)`,
    sourceCitation: 'Nguyễn Anh Thái (chủ biên), Lịch sử thế giới hiện đại, NXB Giáo dục, 2000, tr.3',
    statements: [
      {
        id: 'a',
        statement: 'Liên Xô là nhà nước xã hội chủ nghĩa đầu tiên trên thế giới.',
        isCorrect: true,
        explanation: 'Đúng: Văn bản nêu rõ: "sự ra đời của Nhà nước xã hội chủ nghĩa đầu tiên trên thế giới – Liên bang Cộng hòa xã hội chủ nghĩa Xô viết (gọi tắt là Liên Xô)".'
      },
      {
        id: 'b',
        statement: 'Nhà nước Liên Xô bắt đầu tỏ ra có sức mạnh phi thường từ sau khi đánh bại phát xít.',
        isCorrect: false,
        explanation: 'Sai: Ngay từ khi thành lập trong vòng vây của đế quốc, Liên Xô đã kiên cường xây dựng chế độ mới và gặt hái nhiều thành tựu phi thường trước khi đánh bại phát xít.'
      },
      {
        id: 'c',
        statement: 'Việc Liên Xô đánh thắng phát xít đã tạo điều kiện cho nhiều nước khác đứng lên tự giải phóng.',
        isCorrect: true,
        explanation: 'Đúng: Chiến thắng phát xít của Hồng quân Liên Xô cổ vũ và mở đường thuận lợi cho các nước Đông Âu, châu Á (như Việt Nam 1945) đứng lên giải phóng dân tộc.'
      },
      {
        id: 'd',
        statement: 'Đoạn trích đã tóm tắt quá trình thành lập Liên bang cộng hòa xã hội chủ nghĩa Xô viết.',
        isCorrect: false,
        explanation: 'Sai: Đoạn trích nêu ý nghĩa lịch sử, tinh thần kiên cường xây dựng bảo vệ đất nước và sự hình thành hệ thống XHCN thế giới, không tóm tắt quá trình thành lập năm 1922.'
      }
    ]
  }
];

export const ESSAY_FLASHCARDS: Flashcard[] = [
  {
    id: 'fc_1',
    topic: '1. CNXH sau CTTG II - Tại châu Á',
    category: 'asia',
    front: 'Sự mở rộng của chủ nghĩa xã hội ở Châu Á sau CTTG II?',
    back: 'Sau CTTG thứ hai, phong trào giải phóng dân tộc ở châu Á phát triển mạnh.\nCác quốc gia đi lên con đường xây dựng CNXH bao gồm: Trung Quốc (1949), Việt Nam, Lào...\n=> Đánh dấu sự mở rộng, tăng cường sức mạnh của CNXH trên phạm vi toàn cầu.',
    subPoints: [
      'Sau CTTG II: phong trào GPDT ở châu Á phát triển mạnh mẽ.',
      'Các nước theo CNXH: Trung Quốc (1949), Việt Nam, Lào...',
      'Ý nghĩa: Đánh dấu sự mở rộng, tăng cường sức mạnh của CNXH trên phạm vi toàn cầu.'
    ]
  },
  {
    id: 'fc_2',
    topic: '1. CNXH sau CTTG II - Khu vực Mỹ La-tinh',
    category: 'latin_america',
    front: 'Chủ nghĩa xã hội ở khu vực Mỹ La-tinh (Cu-ba)?',
    back: '• Năm 1959: Nước Cộng hoà Cu-ba được thành lập và tiến hành nhiều cải cách dân chủ.\n• Từ năm 1961: Cu-ba bước vào thời kì xây dựng xã hội chủ nghĩa và đạt nhiều thành tựu.\n=> Chủ nghĩa xã hội đã trở thành một hệ thống trên thế giới.',
    subPoints: [
      'Năm 1959: Nước Cộng hoà Cu-ba thành lập, tiến hành cải cách dân chủ.',
      'Từ năm 1961: Cu-ba chính thức bước vào thời kì xây dựng CNXH.',
      'Ý nghĩa: Đánh dấu CNXH vượt ra ngoài lục địa Á - Âu, trở thành một hệ thống thế giới.'
    ]
  },
  {
    id: 'fc_3',
    topic: '2. Khủng hoảng & sụp đổ - Quá trình',
    category: 'collapse',
    front: 'Quá trình suy thoái và sụp đổ của CNXH ở Đông Âu và Liên Xô?',
    back: '• Từ cuối những năm 1970: Các nước XHCN ở Đông Âu lâm vào tình trạng suy thoái, khủng hoảng.\n• Cuối những năm 1980: Chủ nghĩa xã hội ở Đông Âu tan rã.\n• Năm 1991: Sau thất bại của công cuộc cải tổ, Nhà nước Liên bang Xô viết tan rã, chấm dứt chế độ XHCN.',
    subPoints: [
      'Cuối những năm 1970: Đông Âu lâm vào khủng hoảng, suy thoái.',
      'Cuối những năm 1980: CNXH ở Đông Âu chính thức tan rã.',
      'Năm 1991: Sau thất bại của cải tổ, Liên Xô tan rã, chế độ XHCN ở đây sụp đổ.'
    ]
  },
  {
    id: 'fc_4',
    topic: '2. Khủng hoảng & sụp đổ - Nguyên nhân',
    category: 'collapse',
    front: '4 Nguyên nhân dẫn đến sự khủng hoảng, sụp đổ của CNXH ở Đông Âu và Liên Xô?',
    back: '1. Đường lối lãnh đạo của Đảng mang tính chủ quan. Xây dựng mô hình kinh tế tập trung, quan liêu, bao cấp. Chậm đổi mới cơ chế và hệ thống quản lí kinh tế.\n2. Không bắt kịp sự phát triển của cách mạng khoa học - công nghệ hiện đại, năng suất lao động giảm.\n3. Phạm nhiều sai lầm về đường lối, chủ trương khi tiến hành cải cách.\n4. Hoạt động chống phá của các thế lực thù địch trong và ngoài nước.',
    subPoints: [
      'Đường lối chủ quan, duy ý chí; mô hình tập trung quan liêu bao cấp, chậm đổi mới.',
      'Không bắt kịp cách mạng khoa học - công nghệ hiện đại.',
      'Sai lầm nghiêm trọng trong đường lối, chủ trương khi cải tổ/cải cách.',
      'Hoạt động chống phá quyết liệt từ các thế lực thù địch trong và ngoài nước.'
    ]
  },
  {
    id: 'fc_5',
    topic: '3. CNXH từ 1991 đến nay - Cải cách mở cửa Trung Quốc',
    category: 'china_reform',
    front: 'Thời gian và đường lối Cải cách mở cửa của Trung Quốc?',
    back: 'Tháng 12/ 1978, Trung Quốc thực hiện cải cách mở cửa, chuyển sang nền kinh tế thị trường, kiên trì con đường xây dựng chủ nghĩa xã hội đặc sắc Trung Quốc.',
    subPoints: [
      'Thời gian bắt đầu: Tháng 12/1978 (Hội nghị Trung ương 3 khóa XI).',
      'Đường lối trọng tâm: Lấy phát triển kinh tế làm trung tâm, thực hiện cải cách mở cửa, chuyển sang nền kinh tế thị trường XHCN.'
    ]
  },
  {
    id: 'fc_6',
    topic: '3. Cải cách mở cửa Trung Quốc - Thành tựu Kinh tế',
    category: 'china_reform',
    front: 'Thành tựu về KINH TẾ của Trung Quốc qua công cuộc cải cách mở cửa?',
    back: '• Tổng sản phẩm trong nước (GDP) tăng lên hơn 114 nghìn tỉ nhân dân tệ (2021).\n• Bình quân tăng trưởng hàng năm là 9,5% (1980 – 2017).\n• Quy mô GDP vươn lên vị trí thứ hai thế giới (từ năm 2010).',
    subPoints: [
      'GDP năm 2021: Đạt hơn 114 nghìn tỉ nhân dân tệ.',
      'Tốc độ tăng trưởng: Bình quân 9,5%/năm (giai đoạn 1980 - 2017).',
      'Vị thế toàn cầu: Quy mô GDP vươn lên vị trí thứ 2 thế giới kể từ năm 2010.'
    ]
  },
  {
    id: 'fc_7',
    topic: '3. Cải cách mở cửa Trung Quốc - Khoa học công nghệ',
    category: 'china_reform',
    front: 'Thành tựu về KHOA HỌC - CÔNG NGHỆ của Trung Quốc?',
    back: '• Phát triển ngành hàng không vũ trụ.\n• Xây dựng hệ thống đường sắt cao tốc, phát triển hạ tầng kĩ thuật...\n• Đạt được tiến bộ vượt bậc trong các lĩnh vực công nghệ mới như: trí tuệ nhân tạo (AI), công nghệ sinh học,...',
    subPoints: [
      'Phát triển mạnh mẽ ngành hàng không vũ trụ.',
      'Hệ thống đường sắt cao tốc hiện đại hàng đầu thế giới.',
      'Tiến bộ vượt bậc về công nghệ tương lai: Trí tuệ nhân tạo (AI), công nghệ sinh học.'
    ]
  },
  {
    id: 'fc_8',
    topic: '3. Cải cách mở cửa Trung Quốc - Văn hoá, Giáo dục, Xã hội',
    category: 'china_reform',
    front: 'Thành tựu về VĂN HÓA, GIÁO DỤC và XÃ HỘI của Trung Quốc?',
    back: '• Văn hoá - giáo dục: Cải cách giáo dục toàn diện, đào tạo nguồn nhân lực chất lượng cao; thực hiện kế hoạch quốc gia về cải cách giáo dục và phát triển 2010-2020.\n• Về xã hội: Giải quyết các vấn đề xã hội như xóa đói giảm nghèo; thực hiện chính sách an sinh xã hội.\n=> Ý nghĩa: Thể hiện sự đúng đắn của công cuộc xây dựng CNXH ở Trung Quốc và nâng cao vị thế của Trung Quốc trên trường quốc tế.',
    subPoints: [
      'Giáo dục: Cải cách toàn diện, đào tạo nhân lực chất lượng cao (kế hoạch 2010-2020).',
      'Xã hội: Xóa đói giảm nghèo ấn tượng, bảo đảm an sinh xã hội.',
      'Ý nghĩa: Khẳng định sự đúng đắn của con đường CNXH, nâng cao vị thế Trung Quốc.'
    ]
  }
];

export const MATCHING_PAIRS: MatchingPair[] = [
  {
    id: 'm1',
    type: 'event_date',
    left: '1776',
    right: 'Tuyên ngôn Độc lập nước Mĩ ra đời',
    category: 'Sự kiện ↔ Thời gian'
  },
  {
    id: 'm2',
    type: 'event_date',
    left: '1789',
    right: 'Bùng nổ Cách mạng tư sản Pháp',
    category: 'Sự kiện ↔ Thời gian'
  },
  {
    id: 'm3',
    type: 'event_date',
    left: '1917',
    right: 'Cách mạng tháng Mười Nga bùng nổ',
    category: 'Sự kiện ↔ Thời gian'
  },
  {
    id: 'm4',
    type: 'event_date',
    left: '1922',
    right: 'Thành lập Liên bang Xô viết (Liên Xô)',
    category: 'Sự kiện ↔ Thời gian'
  },
  {
    id: 'm5',
    type: 'event_date',
    left: '1924',
    right: 'Hiến pháp đầu tiên của Liên Xô được thông qua',
    category: 'Sự kiện ↔ Thời gian'
  },
  {
    id: 'm6',
    type: 'event_date',
    left: '1949',
    right: 'Nước CHND Trung Hoa thành lập đi lên CNXH',
    category: 'Sự kiện ↔ Thời gian'
  },
  {
    id: 'm7',
    type: 'event_date',
    left: '1959',
    right: 'Cộng hòa Cu-ba được thành lập',
    category: 'Sự kiện ↔ Thời gian'
  },
  {
    id: 'm8',
    type: 'event_date',
    left: '1961',
    right: 'Cu-ba bước vào thời kì xây dựng CNXH',
    category: 'Sự kiện ↔ Thời gian'
  },
  {
    id: 'm9',
    type: 'event_date',
    left: '1978',
    right: 'Trung Quốc thực hiện cải cách mở cửa',
    category: 'Sự kiện ↔ Thời gian'
  },
  {
    id: 'm10',
    type: 'event_date',
    left: '1991',
    right: 'Nhà nước Liên bang Xô viết tan rã',
    category: 'Sự kiện ↔ Thời gian'
  },
  {
    id: 'm11',
    type: 'person_event',
    left: 'V.I. Lê-nin',
    right: 'Lãnh đạo CM tháng Mười Nga & ban hành Sắc lệnh ruộng đất',
    category: 'Nhân vật ↔ Sự kiện'
  },
  {
    id: 'm12',
    type: 'person_event',
    left: 'Vua Lu-i XVI',
    right: 'Vua chuyên chế của nước Pháp trước cách mạng',
    category: 'Nhân vật ↔ Sự kiện'
  },
  {
    id: 'm13',
    type: 'person_event',
    left: 'Vua Sác-lơ I',
    right: 'Vua nước Anh bị lật đổ trong cách mạng thế kỉ XVII',
    category: 'Nhân vật ↔ Sự kiện'
  },
  {
    id: 'm14',
    type: 'country_feature',
    left: 'Nước Anh',
    right: '“Đế quốc mà Mặt Trời không bao giờ lặn”',
    category: 'Quốc gia ↔ Đặc điểm'
  },
  {
    id: 'm15',
    type: 'country_feature',
    left: 'Xiêm và Nhật Bản',
    right: 'Hai quốc gia châu Á giữ được độc lập cuối thế kỉ XIX',
    category: 'Quốc gia ↔ Đặc điểm'
  },
  {
    id: 'm16',
    type: 'concept_detail',
    left: 'Nhiệm vụ Dân tộc',
    right: 'Thống nhất thị trường, giành độc lập dân tộc',
    category: 'Khái niệm ↔ Nội dung'
  },
  {
    id: 'm17',
    type: 'concept_detail',
    left: 'Nhiệm vụ Dân chủ',
    right: 'Xóa bỏ phong kiến chuyên chế, xác lập tự do chính trị',
    category: 'Khái niệm ↔ Nội dung'
  },
  {
    id: 'm18',
    type: 'concept_detail',
    left: 'Tổ chức độc quyền',
    right: 'Liên minh giữa các nhà tư bản lớn để thao túng sản xuất',
    category: 'Khái niệm ↔ Nội dung'
  }
];

export const ALL_QUESTIONS: Question[] = [
  ...LESSON_1_QUESTIONS,
  ...LESSON_2_QUESTIONS,
  ...LESSON_3_QUESTIONS
];

export const TOPICS_META = [
  {
    id: 'bai-1',
    number: 'CHỦ ĐỀ 1',
    title: 'Một số vấn đề chung về cách mạng tư sản',
    questionCount: 23,
    description: 'Tiền đề, mục tiêu, nhiệm vụ, lực lượng lãnh đạo và ý nghĩa của các cuộc CMTS tiêu biểu (Anh, Bắc Mĩ, Pháp).'
  },
  {
    id: 'bai-2',
    number: 'CHỦ ĐỀ 2',
    title: 'Sự xác lập và phát triển của chủ nghĩa tư bản',
    questionCount: 23,
    description: 'Sự xác lập CNTB ở Âu - Mĩ, quá trình mở rộng thuộc địa, chuyển sang CNTB độc quyền và CNTB hiện đại.'
  },
  {
    id: 'bai-3',
    number: 'CHỦ ĐỀ 3',
    title: 'Sự hình thành Liên bang Cộng hòa Xã hội Chủ nghĩa Xô Viết',
    questionCount: 23,
    description: 'Cách mạng Nga 1917, quá trình thành lập Liên Xô năm 1922, ý nghĩa lịch sử đối với Liên Xô và thế giới.'
  },
  {
    id: 'bai-4',
    number: 'CHUYÊN ĐỀ ĐẶC BIỆT',
    title: 'Chủ nghĩa xã hội sau Chiến tranh thế giới thứ hai',
    questionCount: 8,
    description: 'Sự mở rộng CNXH ở châu Á, Cu-ba, nguyên nhân khủng hoảng Đông Âu & Liên Xô, cải cách mở cửa Trung Quốc.'
  }
];
