import mongoose from 'mongoose'
import moment from 'moment'

export const USER = {
  ROLE: {
    ADMIN:   1,
    PARENT:  2,
    TEACHER: 3
  }
}

let TeacherSchema = new mongoose.Schema({
  userId:             {
    type:     Number,
    required: false,
    default:  moment().format('x')
  },
  firstName:          {
    type:     String,
    required: false
  },
  lastName:           {
    type:     String,
    required: false
  },
  sex:                {
    type:     Number,
    required: false,
    default:  0
  },
  birthday:           {
    type:     Date,
    required: false
  },
  email:              {
    type:     String,
    required: false
  },
  phone:              {
    type:     String,
    required: false
  },
  address:            {
    type:     String,
    required: false
  },
  nativeLand:            {
    type:     String,
    required: false
  },
  voiceId:            {
    type:     Number,
    required: false
  },
  cityId:             {
    type:     Number,
    required: false
  },
  teachingAtDistrict: {
    type:     Array,
    required: false
  },
  workLevel:          {
    type:     Number,
    required: false
  },
  workAt:             {
    type:     String,
    required: false
  },
  teachingClasses:    {
    type:     Array,
    required: false
  },
  teachingSubjects:   {
    type:     Array,
    required: false
  },
  teachingAtTime:     {
    type:     Array,
    required: false
  },
  avatar:             {
    type:     String,
    required: false
  },
  degree:             {
    type:     String,
    required: false
  },
  identityCard:       {
    type:     String,
    required: false
  },
  role:               {
    type:     Number,
    required: true,
    default:  USER.ROLE.TEACHER
  },
  createdAt:          {
    type:     Date,
    default:  new Date(),
    required: true
  },
  updatedAt:          {
    type:     Date,
    default:  new Date(),
    required: true
  }
})

module.exports = mongoose.model('Teachers', TeacherSchema)
