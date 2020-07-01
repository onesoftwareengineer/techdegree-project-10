module.exports = [
    {
        "route": "GET /api/users 200",
        "description": "Returns the currently authenticated user. When authentication fails a 401 status code is returned."
    },
    {
        "route": "POST /api/users 201",
        "description": "Creates a user, sets the Location header to '/', and returns no content"
    },
    {
        "route": "GET /api/courses 200",
        "description": "Returns a list of courses (including the user that owns each course)"
    },
    {
        "route": "GET /api/courses/:id 200",
        "description": "Returns a the course (including the user that owns the course) for the provided course ID"
    },
    {
        "route": "POST /api/courses 201",
        "description": "Creates a course, sets the Location header to the URI for the course, and returns no content. Validation error(s) are sent with a400 status code. When authentication fails a 401 status code is returned."
    },
    {
        "route": "PUT /api/courses/:id 204",
        "description": "Updates a course and returns no content. Returns a 403 status code if the current user doesn't own the requested course. Validation error(s) are sent with a400 status code. When authentication fails a 401 status code is returned."
    },
    {
        "route": "DELETE /api/courses/:id 204",
        "description": "Deletes a course and returns no content. Returns a 403 status code if the current user doesn't own the requested course. When authentication fails a 401 status code is returned."
    }
]