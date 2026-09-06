class MockColorResponseService
  def fetch_response(prompt)
    if prompt.include?("ワクワク")
      color_response
    else
      comment_response
    end
  end
  private

  def color_response
    {
      "choices" => [
        {
          "message" => {
            "content" => <<~TEXT
              #FF5733 : ワクワクを表す赤
              #FFD700 : ワクワクを表す黄色
              #00BFFF : ワクワクを表す青
              #7CFC00 : ワクワクを表す緑
            TEXT
          }
        }
      ]
    }
  end

  def comment_response
    {
      "choices" => [
        {
          "message" => {
            "content" => "mockコメント"
          }
        }
      ]
    }
  end
end
