if Rails.env === 'production'
  Rails.application.config.session_store :cookie_store, key: '_react-rails-calendar', domain: 'https://react-rails-calendar.herokuapp.com/api/v1/events/'
else
  Rails.application.config.session_store :cookie_store, key: '_react-rails-calendar'
end
