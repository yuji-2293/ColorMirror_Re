class ColorResponseService
  def initialize
    @client = OpenAI::Client.new
    @default_model = Rails.application.config.openai[:default_model]
  end

  def fetch_response(prompt)
  @client.chat(
      parameters: {
        model: @default_model,
        messages: [
          { role: "system", content: "#{prompt}" },
          { role: "user", content: prompt }
        ],
        max_tokens: 500,
        temperature: 0.7
      }
    )
  end
end
