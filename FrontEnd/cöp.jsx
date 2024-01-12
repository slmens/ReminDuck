{
  /* <Formik
          initialValues={{
            header: "",
            desc: "",
            days: [],
          }}
          validationSchema={Yup.object({
            header: Yup.string().required(
              "You must enter the name of the person you want to call!"
            ),
            desc: Yup.string(),
            days: Yup.array().required("You should choose at least 1 day!"),
          })}
          onSubmit={(values, { resetForm, setSubmitting }) => {
            console.log(values);
          }}
        >
          {({
            values,
            errors,
            handleChange,
            handleSubmit,
            handleReset,
            dirty,
            isSubmitting,
          }) => (
            <Form onSubmit={handleSubmit}>
              <h3>Create Call Reminder</h3>
              <label htmlFor="header">Person to Call</label> <br />
              <input
                type="text"
                id="header"
                placeholder="John"
                name="header"
                className="input"
                value={values.header}
                onChange={handleChange}
              />
              <br />
              <label htmlFor="desc">Description for Call Reminder</label> <br />
              <input
                type="text"
                id="desc"
                placeholder="I gotta call John about tomorrow"
                name="desc"
                className="input"
                value={values.desc}
                onChange={handleChange}
              />
              <br />
              <h2>Checkbox for days to remind</h2>
              <div>
                <Field name="days">
                  {({
                    field, // { name, value, onChange, onBlur }
                    form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                    meta,
                  }) => (
                    <div>
                      {checkBoxDayOptions.map((option) => {
                        return (
                          <div key={option.key + "a"} className="flex">
                            <input
                              type="checkbox"
                              value={option.value}
                              name={option.key}
                              checked={values.days.includes(option.value)}
                              onChange={handleChange}
                              className="mr-3"
                            />
                            <label htmlFor={field.id}></label>
                            <br />
                          </div>
                        );
                      })}
                      {meta.touched && meta.error && (
                        <div className="error">{meta.error}</div>
                      )}
                    </div>
                  )}
                </Field>

                {checkBoxDayOptions.map((option) => {
                  return (
                    <div key={option.key + "a"} className="flex">
                      <Field
                        type="checkbox"
                        value={option.value}
                        name={option.key}
                        checked={values.days.includes(option.value)}
                        onChange={handleChange}
                        label={option.value}
                        className="mr-3"
                      />
                      <br />
                    </div>
                  );
                })}
              </div>
              <button type="submit" disabled={!dirty}>
                Create Call Reminder
              </button>
            </Form>
          )}
        </Formik>*/
}
