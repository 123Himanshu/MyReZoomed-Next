"use client"

import { ResumeData } from "@/types/resume"
import { Card, CardContent } from "@/components/ui/card"

interface ResumePreviewProps {
  data: ResumeData;
  originalText?: string;
}

export function ResumePreview({ data, originalText }: ResumePreviewProps) {
  return (
    <Card className="mt-8">
      <CardContent className="p-6 space-y-6">
        {originalText && (
          <div className="mb-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Original Text</h3>
            <pre className="whitespace-pre-wrap text-sm text-gray-700">{originalText}</pre>
          </div>
        )}
        {/* Personal Information */}
        <div>
          <h2 className="text-2xl font-bold mb-4">{data["Personal Information"].name}</h2>
          <div className="text-gray-600 space-y-1">
            <p>{data["Personal Information"].email}</p>
            <p>{data["Personal Information"].phone}</p>
            <p>{data["Personal Information"].address}</p>
          </div>
        </div>

        {/* Skills */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Skills</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Technical Skills</h4>
              <div className="flex flex-wrap gap-2">
                {data.Skills["Technical Skills"].map((skill, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Soft Skills</h4>
              <div className="flex flex-wrap gap-2">
                {data.Skills["Soft Skills"].map((skill, index) => (
                  <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Work Experience */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Work Experience</h3>
          <div className="space-y-4">
            {data["Work Experience"].map((exp, index) => (
              <div key={index} className="border-b pb-4 last:border-0">
                <h4 className="font-medium">{exp.position}</h4>
                <p className="text-primary">{exp.company}</p>
                <p className="text-sm text-gray-600">{exp.dates}</p>
                <p className="mt-2 text-gray-700">{exp.responsibilities}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Projects */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Projects</h3>
          <div className="space-y-4">
            {data.Projects.map((project, index) => (
              <div key={index} className="border-b pb-4 last:border-0">
                <h4 className="font-medium">{project.title}</h4>
                <p className="mt-2 text-gray-700">{project.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Certifications</h3>
          <div className="space-y-4">
            {data.Certifications.map((cert, index) => (
              <div key={index} className="border-b pb-4 last:border-0">
                <h4 className="font-medium">{cert.name}</h4>
                <p className="text-primary">{cert.issuer}</p>
                <p className="mt-1 text-gray-700">{cert.details}</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
