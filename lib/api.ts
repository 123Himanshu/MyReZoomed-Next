// API call helpers for frontend

export const API_BASE_URL =
  process.env.NODE_ENV === "production" ? "https://your-domain.com/api" : "http://localhost:3000/api"

export const PYTHON_API_BASE_URL =
  process.env.NODE_ENV === "production" ? "https://your-python-service.com" : "http://localhost:8000"

export async function enhanceResume(file: File) {
  const formData = new FormData()
  formData.append("file", file)

  const response = await fetch(`${API_BASE_URL}/enhance-resume`, {
    method: "POST",
    body: formData,
  })

  if (!response.ok) {
    throw new Error("Failed to enhance resume")
  }

  return response.json()
}

export async function checkATSScore(file: File, jobDescription: string) {
  const formData = new FormData()
  formData.append("file", file)
  formData.append("jobDescription", jobDescription)

  const response = await fetch(`${API_BASE_URL}/check-ats`, {
    method: "POST",
    body: formData,
  })

  if (!response.ok) {
    throw new Error("Failed to check ATS score")
  }

  return response.json()
}

export async function downloadFile(fileId: string) {
  const response = await fetch(`${API_BASE_URL}/download?id=${fileId}`)

  if (!response.ok) {
    throw new Error("Failed to download file")
  }

  return response.blob()
}
