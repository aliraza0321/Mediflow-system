const { AppError } = require("../core/errors/AppError");
const { ROLES } = require("../config/roles");
const { UserPresenter } = require("./UserPresenter");

class DoctorService {
    constructor({ userRepository, appointmentRepository, ratingRepository }) {
        this.userRepository = userRepository;
        this.appointmentRepository = appointmentRepository;
        this.ratingRepository = ratingRepository;
    }

    async getDoctorDashboard(doctorId) {// async here
        const doctorAppointments = await this.appointmentRepository.findByDoctorId(doctorId);// await here 
        const uniquePatients = new Set(doctorAppointments.map((item) => item.patientId));

        return {
            totalPatients: uniquePatients.size,
            totalAppointments: doctorAppointments.length,
            totalPrescriptions: 0,
        };
    }

    async getAssignedPatients(doctorId) {// async here 
        const doctorAppointments = await this.appointmentRepository.findByDoctorId(doctorId);// await
        const patientIds = [...new Set(doctorAppointments.map((item) => item.patientId))];

        /*return patientIds.map((patientId) => {
          const patient = this.userRepository.findById(patientId);
          const activeAppointment = doctorAppointments.find((item) => item.patientId === patientId);*/
        return Promise.all(
            patientIds.map(async (patientId) => {
                const patient = await this.userRepository.findById(patientId);

                const activeAppointment = doctorAppointments.find(
                    (item) => item.patientId === patientId
                );

                if (!patient) {
                    throw new AppError("Patient record was not found.", 404);
                }

                return {
                    id: patient.id,
                    name: patient.name,
                    status: activeAppointment?.status || "scheduled",
                };
            }));
    }

    /*getAppointments(doctorId) {
      return this.appointmentRepository.findByDoctorId(doctorId).map((appointment) => {
        const patient = this.userRepository.findById(appointment.patientId);*/
    async getAppointments(doctorId) {
        const appointments = await this.appointmentRepository.findByDoctorId(doctorId);

        return Promise.all(
            appointments.map(async (appointment) => {
                const patient = await this.userRepository.findById(appointment.patientId);
                return {
                    id: appointment.id,
                    patient: patient ? patient.name : "Unknown Patient",
                    time: appointment.date,
                    status: appointment.status,
                    reason: appointment.reason,
                };
            })
        );
        
    }

    /*getDoctorDirectory() {
      return this.userRepository.findByRole(ROLES.DOCTOR).map((doctor) => {
        const ratings = this.ratingRepository.findByDoctorId(doctor.id);
        const averageRating = ratings.length === 0
          ? null
          : Number((ratings.reduce((sum, item) => sum + item.rating, 0) / ratings.length).toFixed(1));
  
        return {
          ...UserPresenter.toSafeUser(doctor),
          rating: averageRating,
        };
      });
    }*/

    async getDoctorDirectory() {
        const doctors = await this.userRepository.findByRole(ROLES.DOCTOR);

        return Promise.all(
            doctors.map(async (doctor) => {
                //const ratings = await this.ratingRepository.findByDoctorId(doctor.id);
                const ratings = (await this.ratingRepository.findByDoctorId(doctor.id)) || [];// new gaurd for filter
              
                const averageRating =
                    ratings.length === 0
                        ? null
                        : Number(
                            (
                                ratings.reduce((sum, item) => sum + item.rating, 0) /
                                ratings.length
                            ).toFixed(1)
                        );

                return {
                    ...UserPresenter.toSafeUser(doctor),
                    rating: averageRating,
                };
            })
        );
    }

}

module.exports = { DoctorService };
