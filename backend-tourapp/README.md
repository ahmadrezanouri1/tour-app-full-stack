# Tour App Backend

This is the backend service for the Tour Application, built with Django and Django REST Framework.

## Setup

1. Create a virtual environment:
```bash
python -m venv venv
```

2. Activate the virtual environment:
- Windows:
```bash
.\venv\Scripts\activate
```
- Unix/MacOS:
```bash
source venv/bin/activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create .env file:
```bash
SECRET_KEY=your-secret-key
DEBUG=True
DATABASE_URL=postgresql://user:password@localhost:5432/tourapp
```

5. Run migrations:
```bash
python manage.py migrate
```

6. Create superuser:
```bash
python manage.py createsuperuser
```

7. Run the server:
```bash
python manage.py runserver
```

## API Endpoints

### Tours

#### List Tours
- URL: `/api/tours/`
- Method: `GET`
- Query Parameters:
  - `type`: Filter by tour type (domestic/foreign)
  - `destination`: Filter by destination
  - `min_price`: Filter by minimum price
  - `max_price`: Filter by maximum price
  - `duration`: Filter by duration
  - `season`: Filter by season

#### Tour Detail
- URL: `/api/tours/<id>/`
- Method: `GET`
- Response: Detailed tour information

### Destinations

#### List Destinations
- URL: `/api/destinations/`
- Method: `GET`
- Query Parameters:
  - `country`: Filter by country
  - `type`: Filter by type (city/region)

#### Destination Detail
- URL: `/api/destinations/<id>/`
- Method: `GET`
- Response: Detailed destination information

### Bookings

#### Create Booking
- URL: `/api/bookings/`
- Method: `POST`
- Body:
```json
{
    "tour_id": 1,
    "traveler_count": 2,
    "start_date": "2024-03-01",
    "contact_info": {
        "name": "John Doe",
        "email": "john@example.com",
        "phone": "+1234567890"
    }
}
```

#### List User Bookings
- URL: `/api/bookings/`
- Method: `GET`
- Headers: `Authorization: Bearer <token>`

### Authentication

#### Login
- URL: `/api/auth/login/`
- Method: `POST`
- Body:
```json
{
    "username": "user@example.com",
    "password": "password123"
}
```

#### Register
- URL: `/api/auth/register/`
- Method: `POST`
- Body:
```json
{
    "email": "user@example.com",
    "password": "password123",
    "full_name": "John Doe",
    "phone": "+1234567890"
}
```

### Blog

#### List Posts
- URL: `/api/blog/posts/`
- Method: `GET`
- Query Parameters:
  - `category`: Filter by category
  - `tag`: Filter by tag
  - `search`: Search in title and content

#### Post Detail
- URL: `/api/blog/posts/<id>/`
- Method: `GET`
- Response: Detailed blog post information

## Models

### Tour
```python
class Tour:
    title = CharField
    description = TextField
    type = CharField(choices=['domestic', 'foreign'])
    destination = ForeignKey(Destination)
    duration = IntegerField
    price = DecimalField
    season = CharField
    included_services = ArrayField
    excluded_services = ArrayField
    itinerary = JSONField
    images = ManyToManyField(Image)
    rating = FloatField
```

### Destination
```python
class Destination:
    name = CharField
    country = CharField
    description = TextField
    type = CharField(choices=['city', 'region'])
    image = ImageField
    attractions = ArrayField
    climate = TextField
```

### Booking
```python
class Booking:
    user = ForeignKey(User)
    tour = ForeignKey(Tour)
    booking_date = DateTimeField
    travel_date = DateField
    traveler_count = IntegerField
    total_price = DecimalField
    status = CharField
    contact_info = JSONField
```

### BlogPost
```python
class BlogPost:
    title = CharField
    content = TextField
    author = ForeignKey(User)
    category = ForeignKey(Category)
    tags = ManyToManyField(Tag)
    image = ImageField
    published_date = DateTimeField
    status = CharField
```

## Admin Interface

The Django admin interface is available at `/admin/` and provides management for:
- Tours and Destinations
- Bookings and Users
- Blog Posts and Categories
- Media Files

## Development

### Running Tests
```bash
python manage.py test
```

### Code Style
The project follows PEP 8 guidelines. Run flake8 for style checking:
```bash
flake8
```

## Deployment

1. Set DEBUG=False in .env
2. Configure your web server (e.g., Nginx)
3. Set up SSL certificate
4. Configure static and media files serving
5. Set up database backup 