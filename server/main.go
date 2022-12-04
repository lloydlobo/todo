package main

import (
	"fmt"
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

var (
	PORT = ":8080"
)

func main() {
	mainRun()
	fmt.Println("ran mainRun")
}

// TODO: Add the following: // Body int `json:"body"`
type Todo struct {
	UserID    int    `json:"userId"`
	ID        int    `json:"id"`
	Title     string `json:"title"`
	Body      string `json:"body"`
	Completed bool   `json:"completed"`
}

// https://youtu.be/QevhhM_QfbM?t=917
// Build A Go REST API, React.js & TypeScript Todo Application
func mainRun() {
	app := fiber.New()

	// Use a new CORS application.
	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost:3000",
		AllowHeaders: "Origin, Content-Type, Accept",
	}))

	todos := []Todo{}

	app.Get("/healthcheck", handleHealthCheck)

	// Post a todo.
	app.Post("/api/todos", func(c *fiber.Ctx) error {
		todo := &Todo{}

		// Parser can throw an error.
		if err := c.BodyParser(todo); err != nil {
			return err
		}
		todo.ID = len(todos) + 1

		// Append new todo to array of todos.
		todos = append(todos, *todo) // dereference it.

		return c.JSON(todos) // SendString sets the HTTP response body  for string type.
	})

	app.Patch("/api/todos/:id/uncompleted", func(c *fiber.Ctx) error {
		id, err := c.ParamsInt(("id"))
		if err != nil {
			return c.Status(401).SendString("Invalid id")
		}
		for idx, todo := range todos {
			if todo.ID == id {

				todos[idx].Completed = false
				break
			}
		}
		return c.JSON(todos)
	})
	app.Patch("/api/todos/:id/completed", func(c *fiber.Ctx) error {
		id, err := c.ParamsInt(("id"))
		if err != nil {
			return c.Status(401).SendString("Invalid id")
		}
		for idx, todo := range todos {
			if todo.ID == id {
				todos[idx].Completed = true
				break
			}
		}
		return c.JSON(todos)
	})

	app.Get("/api/todos", func(c *fiber.Ctx) error {
		return c.JSON(todos)
	})

	log.Fatal(app.Listen(PORT))
}

func handleHealthCheck(c *fiber.Ctx) error {
	return c.SendString("OK") // SendString sets the HTTP response body  for string type.
}
