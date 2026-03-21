package infra

import (
	"fmt"
	"math/rand"
	"time"
)

const (
	// Allowed chars in generated random strings
	charSet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
)

func GenerateRandomString(length int) string {
	rand.Seed(time.Now().UnixNano())
	b := make([]byte, length)
	for i := range b {
		b[i] = charSet[rand.Intn(len(charSet))]
	}
	return string(b)
}

func GenerateRandomPort() int {
	return 10000 + rand.Intn(65536-10000)
}

func GenerateRandomName(prefix string) string {
	return fmt.Sprintf("%s_%d", prefix, GenerateRandomString(8))
}