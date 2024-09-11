import client from "../db/index.js";

const addStudents = async(req , res) => {
    const { name, college_name, round1, round2, round3, technical_round } = req.body;
  
  const total = round1 + round2 + round3 + technical_round;
  const result = total >= 35 ? 'Selected' : 'Rejected';

  try {
    // Insert new student
    const newStudent = await client.query(
      'INSERT INTO students (name, college_name, round1, round2, round3, technical_round, total, result) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [name, college_name, round1, round2, round3, technical_round, total, result]
    );

    // Calculate and update rank for all students
    const students = await client.query('SELECT * FROM students ORDER BY total DESC');
    let rank = 1;
    let prevTotal = students.rows[0].total;

    for (let i = 0; i < students.rows.length; i++) {
      if (students.rows[i].total !== prevTotal) {
        rank = i + 1;
        prevTotal = students.rows[i].total;
      }

      await client.query('UPDATE students SET rank = $1 WHERE id = $2', [rank, students.rows[i].id]);
    }

    res.json(newStudent.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }

}
const displayStudents = async(req , res) =>{
    try {
        const result = await client.query('SELECT * FROM students ORDER BY total DESC, rank ASC');
        res.json(result.rows);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }

}
export {addStudents , displayStudents} ;