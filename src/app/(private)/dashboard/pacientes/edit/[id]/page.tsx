import PatientForm from "@/components/forms/PatientForm";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPatientPage({ params }: PageProps) {
  const { id } = await params;
  return <PatientForm patientId={id} />;
}
