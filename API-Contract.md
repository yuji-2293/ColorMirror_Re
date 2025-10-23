# API契約のための事前定義ファイル

# DB情報抜粋 型定義の参考
## colors
### カラム情報
  - color_name -string
  - mood -string
## users
### カラム情報
  - email default: "" -string
  - name default: "" -string
  - provider -string
  - uid -string
  - prefecture -integer
  - devise,google認証,LINE API関連のカラムは随時更新する

## self_logs
### カラム情報
  - color_id -integer
  - user_id -integer
## responses
### カラム情報
  - self_log_id -integer
  - color_analysis -string
  - weather_analysis -string
## weather_logs
### カラム情報
  - self_log_id -integer
  - weather_pressure -integer
  - weather_name -string
  - temperature -integer
  - temp_max -integer
  - temp_min -integer
  - weather_icon -string
  - description -string
  - city -string


# APIエンドポイント設定

## GET/api/v1/colors
data:
 - id: number
 - color_name: string
 - mood: string
meta:
  total: number
  per: number
  page: number
error: null

## GET/api/v1/self_logs
data:
  - id: number
  - user_id: number
  - color_id: number
meta:
  total: number
error: null

## GET/api/v1/self_log/:id/responses
data:
  - self_log_id: number
  - color_analysis: string
  - weather_analysis: string
meta: {}
error: null

## GET/api/v1/self_logs/:id/weather_logs
data:
  - self_log_id: number
  - weather_pressure: number
  - weather_name: string
  - temperature: number
  - temp_max: number
  - temp_min: number
  - weather_icon: string
  - description: string
  - city: string
meta: {}
error: null


<!--
機能別ルーティング

## GET/api/v1/users/sessions
## GET/api/v1/users/registrations
## GET/api/v1/users/passwords
## GET/api/v1/users/confirmations
## GET/api/v1/users/omniauth_callbacks
## GET/api/v1/users/profile
## GET/api/v1/users/reminder

# JSからheatmap_dataへのエンドポイント
get "heatmap", to: "result_maps#heatmap_data", as: :heatmap
# JSからradar_map_dataへのエンドポイント
get "map", to: "result_maps#map_data", as: :map
# JSからopen AI へのエンドポイント
post "/colors/analyze", to: "colors#analyze"
# LINEルーティング
post "/callback", to: "line#callback", as: :callback
# OpenWeatherAPI機能のルーティング
get "weather", to: "weathers#index", as: :weather
get "weather/show", to: "weathers#show", as: :show_weather, defaults: { format: :json }

 -->
