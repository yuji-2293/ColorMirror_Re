class AiResponseService
  def process(mood:, color_name:)
    prompt = build_prompt(mood, color_name)
    response = ColorResponseService.new.fetch_response(prompt)
    build_text(response)
  end

private

  def build_prompt(mood, color_name)
      <<~PROMPT
      あなたは色彩心理の専門家です。
      以下の条件でユーザーの気分と色で心象を言語化してください。

      気分: #{ mood } = 直感で選んだユーザーの気分
      色: #{ color_name } = 気分をもとに今の気分に合う選択した色

      できるだけポジティブな言葉を使ってください。
      150字程度で要点を押さえて表現してください。
      マークダウン方式を使わないでください。
      PROMPT
  end
  def build_text(response)
    response["choices"][0]["message"]["content"]
  end
end
