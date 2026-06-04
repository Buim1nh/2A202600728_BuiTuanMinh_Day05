import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  // Simulate network delay for loading states
  await new Promise((resolve) => setTimeout(resolve, 1500));

  try {
    const body = await request.json();
    console.log("Received payload:", body);

    // Dummy logic: if user explicitly says they don't want food, return clarify action
    const msg = body.message?.toLowerCase() || "";
    if (msg.includes("không ăn") || msg.includes("thời tiết")) {
      return NextResponse.json({
        action: "clarify",
        clarify_question: "Mình chỉ giúp bạn tìm đồ ăn được thôi. Bạn đang thèm món gì nào?",
        suggestions: []
      });
    }

    // Default mock response
    return NextResponse.json({
      action: "suggest",
      clarify_question: "",
      suggestions: [
        {
          restaurant_id: "res_001",
          restaurant_name: "Bún Bò Cô Ba",
          dish_name: "Bún Bò Nạm Lớn",
          price: 45000,
          distance_km: 0.8,
          eta_minutes: 15,
          reason: "Món nước nóng hổi đúng ý bạn, giá 45k (< 50k) và chỉ cách 0.8km."
        },
        {
          restaurant_id: "res_005",
          restaurant_name: "Hủ Tiếu Nam Vang Thành Đạt",
          dish_name: "Hủ tiếu nước đặc biệt",
          price: 48000,
          distance_km: 1.2,
          eta_minutes: 18,
          reason: "Hủ tiếu nước nóng, giá 48k nằm trong ngân sách dưới 50k của bạn."
        },
        {
          restaurant_id: "res_009",
          restaurant_name: "Cơm Tấm Ba Ghiền",
          dish_name: "Cơm Tấm Sườn Bì Chả",
          price: 40000,
          distance_km: 1.5,
          eta_minutes: 20,
          reason: "Ăn liền siêu no, sườn siêu to khổng lồ giá hạt dẻ 40k."
        }
      ]
    });
  } catch (error) {
    return NextResponse.json({ error: "Invalid request payload" }, { status: 400 });
  }
}
