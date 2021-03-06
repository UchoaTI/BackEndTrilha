import Appointment from "../models/Appointment"
import AppointmenstRepository from '../repositories/AppointmentsRepository'

import { startOfHour } from 'date-fns'
import { getCustomRepository } from 'typeorm'

import AppError from '../errors/AppError'

interface Request {
  provider_id: string
  date: Date
}
/*
* dependecy inversion
*/

class CreateAppointmentService {

  public async execute({ date, provider_id }: Request): Promise<Appointment> {

    const appointmentsRepository = getCustomRepository(AppointmenstRepository)

    const appointmentDate = startOfHour(date)

    const findAppointmentInSameDate = await appointmentsRepository.
      findBydate(appointmentDate)

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked')
    }

    const appointment = appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    })

    await appointmentsRepository.save(appointment)

    return appointment
  }
}

export default CreateAppointmentService