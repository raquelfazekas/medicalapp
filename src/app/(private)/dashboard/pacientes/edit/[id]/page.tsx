import PatientForm from "@/components/forms/PatientForm";

export default async function EditPatientPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  return <PatientForm patientId={id} />;
}
