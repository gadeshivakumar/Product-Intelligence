const prisma = require("../config/prisma");

const createJob = async ({
  jobType,
  metadata = {},
}) => {

  const job = await prisma.job.create({
    data: {
      jobType,

      metadata,

      status: "PENDING",

      progress: 0,
    },
  });

  return job;
};

const startJob = async (jobId) => {

  return prisma.job.update({
    where: {
      id: jobId,
    },

    data: {
      status: "RUNNING",

      startedAt: new Date(),
    },
  });
};

const updateJobProgress = async (
  jobId,
  progress,
  metadata = {}
) => {

  return prisma.job.update({
    where: {
      id: jobId,
    },

    data: {
      progress,

      metadata,
    },
  });
};

const completeJob = async (
  jobId,
  metadata = {}
) => {

  return prisma.job.update({
    where: {
      id: jobId,
    },

    data: {
      status: "COMPLETED",

      progress: 100,

      completedAt: new Date(),

      metadata,
    },
  });
};

const partiallyCompleteJob = async (
  jobId,
  {
    successfulRows = 0,
    failedRows = 0,
    totalRows = 0,
    metadata = {},
  }
) => {

  return prisma.job.update({
    where: {
      id: jobId,
    },

    data: {
      status: "PARTIALLY_COMPLETED",

      progress: 100,

      successfulRows,

      failedRows,

      totalRows,

      completedAt: new Date(),

      metadata,
    },
  });
};

const failJob = async (
  jobId,
  errorMessage
) => {

  return prisma.job.update({
    where: {
      id: jobId,
    },

    data: {
      status: "FAILED",

      errorMessage,

      completedAt: new Date(),
    },
  });
};

const getJobs = async ({
  page = 1,
  limit = 10,
  status,
  jobType,
}) => {

  const skip = (page - 1) * limit;

  const where = {};

  if (status) {
    where.status = status;
  }

  if (jobType) {
    where.jobType = jobType;
  }

  const [jobs, total] = await Promise.all([
    prisma.job.findMany({
      where,

      skip,

      take: Number(limit),

      orderBy: {
        createdAt: "desc",
      },
    }),

    prisma.job.count({
      where,
    }),
  ]);

  return {
    jobs,

    pagination: {
      total,

      page: Number(page),

      limit: Number(limit),

      totalPages: Math.ceil(total / limit),
    },
  };
};

const getJobById = async (jobId) => {

  return prisma.job.findUnique({
    where: {
      id: jobId,
    },
  });
};

module.exports = {
  createJob,

  startJob,

  updateJobProgress,

  completeJob,

  partiallyCompleteJob,

  failJob,

  getJobs,

  getJobById,
};