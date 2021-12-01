json.extract! event, :id, :title, :description, :label, :day, :created_at, :updated_at
json.url event_url(event, format: :json)
