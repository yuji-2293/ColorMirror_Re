class AiColorService
  def self.generate_color(mood)
    prompt = <<~PROMPT
    "ユーザーが今感じている気分は '#{ mood }' です。
    この気分に最適なカラーコードを4つ提案してください。
    #で始まるHEXカラーコードを使ってください"

    生成した色に対して、ユーザーは気分に近いものを選び取ります。
    '#{ mood }'の状態を４色で色分けして生成してください。
    色彩心理学に基づいて、気分と色の関係を考慮したコメントを生成してください。

    フォーマット: '#{ mood }'な気分 or 連想させる言葉 + を現す「色名」
    条件は以下です。
    \n出力は次の形式で:\nHEX : 色の説明
    1色につき40文字以内。
    「色名」については適切な色名が見つからない場合は近似の色名を使用しても構いません
    マークダウンは使用しないでください。
    PROMPT
    response  = ::ColorResponseService.new.fetch_response(prompt)
    content = response["choices"][0]["message"]["content"]
    colors_with_names = content.scan(/#([0-9a-fA-F]{6})\s*:\s*(?:「([^」]+)」|(.+))/)
    colors_with_names.map do |hex, name1, name2|
      { hex: "##{hex}", name: name1 || name2.strip }
    end
  end
end
