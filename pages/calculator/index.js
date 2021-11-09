import React, { Component, Fragment } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";

import {
  Copyright,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from "@mui/icons-material";
import TextField from "@mui/material/TextField";

import MobileStepper from "@mui/material/MobileStepper";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import MenuItem from "@mui/material/MenuItem";
import { Chart } from "react-google-charts";
import Switch from "@mui/material/Switch";
import { PMT, FV, PV, PrintNice } from "../../components/time_calcs";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import Slide from "@mui/material/Slide";
import TableHead from "@mui/material/TableHead";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import Collapse from "@mui/material/Collapse";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const strategies = [
  {
    value: 0,
    label: "Money Market",
  },
  {
    value: 20,
    label: "Income Fund",
  },
  {
    value: 40,
    label: "Stable Fund",
  },
  {
    value: 60,
    label: "Balanced Fund",
  },
  {
    value: 80,
    label: "Local Equity Fund",
  },
  {
    value: 100,
    label: "Offshore Equity Fund",
  },
];

const increase = [
  {
    value: 0,
    label: "0%",
  },
  {
    value: 0.03,
    label: "3%",
  },
  {
    value: 0.05,
    label: "5%",
  },
  {
    value: 0.07,
    label: "CPI",
  },
  {
    value: 0.1,
    label: "10%",
  },
  {
    value: 0.15,
    label: "15%",
  },
];

class Calculator extends Component {
  state = {
    loading: false,
    inflation: 0.06,
    activeStep: 1,
    before_strat: 0,
    after_strat: 0,
    before_rate: 0,
    after_rate: 0,
    increase: 0.07,
    pv_income: 0,
    pv_capital: 0,
    age: 25,
    ret_age: 55,
    plan_age: 100,
    years_to: 30,
    years_after: 45,
    fee: false,
    fv_capitalNeed: 0,
    pv_capitalNeed: 0,
    RR1: 0,
    RR2: 0,
    RRInc: 0,
    cap_month: 0,
    cap_lump: 0,
    cap_available: 0,
    shortfall: 0,
    add_lump: 0,
    add_month: 0,
    add_month_inc: 0,
    showModal: false,
  };
  data = [
    ["Year", "Sales", "Expenses", "Profit"],
    ["2014", 100, this.state.shortfall, -50],
  ];

  details = {
    1: {
      name: "Your details",
      desc: "For us to crunch your numbers we need you to capture some basics about yourself.",
    },
    2: {
      name: "Your strategy",
      desc: "Let's capture your investment strategies.",
    },
    3: {
      name: "Your costs",
      desc: "The fees you are paying.",
    },
    4: {
      name: "Your needs",
      desc: "The funds you need when you retire.",
    },
    5: {
      name: "Your investments",
      desc: "The funds that you are already investing.",
    },
    6: {
      name: "Your report",
      desc: "The honest picture of your retirement.",
    },
    7: {
      name: "Your adjustments",
      desc: "Tweak your strategy to maximise your retirement.",
    },
  };

  getData = () => {
    return [
      ["Year", "Sales", "Expenses", "Profit"],
      ["2014", 100, this.state.shortfall, -50],
    ];
  };

  handleChange = (event) => {
    this.setState({ before_start: event.target.value });
  };
  handleNext = async () => {
    await this.setState({ activeStep: this.state.activeStep + 1 });
  };

  handleBack = async () => {
    await this.setState({ activeStep: this.state.activeStep - 1 });
    console.log(this.state.activeStep);
  };

  doModal = async () => {
    if (this.state.showModal) {
      await this.setState({ showModal: false });
    } else {
    }
    await this.setState({ showModal: true });
  };

  doRates = async () => {
    //Before Rate

    switch (this.state.before_strat) {
      case 0:
        this.state.fee
          ? await this.setState({ before_rate: 0.05 })
          : await this.setState({ before_rate: 0.04 });
        break;
      case 20:
        this.state.fee
          ? await this.setState({ before_rate: 0.07 })
          : await this.setState({ before_rate: 0.06 });
        break;
      case 40:
        this.state.fee
          ? await this.setState({ before_rate: 0.08 })
          : await this.setState({ before_rate: 0.07 });
        break;
      case 60:
        this.state.fee
          ? await this.setState({ before_rate: 0.09 })
          : await this.setState({ before_rate: 0.08 });
        break;
      case 80:
        this.state.fee
          ? await this.setState({ before_rate: 0.11 })
          : await this.setState({ before_rate: 0.1 });
        break;
      case 100:
        this.state.fee
          ? await this.setState({ before_rate: 0.12 })
          : await this.setState({ before_rate: 0.11 });
        break;
    }

    //After Rate

    switch (this.state.after_strat) {
      case 0:
        this.state.fee
          ? await this.setState({ after_rate: 0.05 })
          : await this.setState({ after_rate: 0.04 });
        break;
      case 20:
        this.state.fee
          ? await this.setState({ after_rate: 0.07 })
          : await this.setState({ after_rate: 0.06 });
        break;
      case 40:
        this.state.fee
          ? await this.setState({ after_rate: 0.08 })
          : await this.setState({ after_rate: 0.07 });
        break;
      case 60:
        this.state.fee
          ? await this.setState({ after_rate: 0.09 })
          : await this.setState({ after_rate: 0.08 });
        break;
      case 80:
        this.state.fee
          ? await this.setState({ after_rate: 0.11 })
          : await this.setState({ after_rate: 0.1 });
        break;
      case 100:
        this.state.fee
          ? await this.setState({ after_rate: 0.12 })
          : await this.setState({ after_rate: 0.11 });
        break;
    }
  };

  doRequired = async () => {
    await this.setState({
      loading: true,
      years_after: this.state.plan_age - this.state.ret_age,
      years_to: this.state.ret_age - this.state.age,
    });
    await this.doRates();

    let RR1 =
      (this.state.before_rate - this.state.inflation) /
      (1 + this.state.inflation).toFixed(4);

    let RR2 =
      (this.state.after_rate - this.state.inflation) /
      (1 + this.state.inflation).toFixed(4);

    const fv_capital =
      FV(
        this.state.inflation,
        this.state.years_to,
        0,
        this.state.pv_capital,
        0
      ) * -1;

    const fv_income =
      FV(
        this.state.inflation,
        this.state.years_to,
        0,
        this.state.pv_income,
        0
      ) * -1;

    const c_pv_income = PV(RR2, this.state.years_after, fv_income, 0, 1) * -1;

    const fv_capitalNeed = (c_pv_income + fv_capital).toFixed(2);

    const pv_capitalNeed = (
      PV(
        this.state.inflation,
        this.state.ret_age - this.state.age,
        0,
        fv_capitalNeed,
        0
      ) * -1
    ).toFixed(2);

    await this.setState({
      years_after: this.state.plan_age - this.state.ret_age,
      years_to: this.state.ret_age - this.state.age,
      pv_capitalNeed: pv_capitalNeed,
      fv_capitalNeed: fv_capitalNeed,
      RR1: RR1,
      RR2: RR2,
    });

    await this.setState({ loading: false });
  };

  doAvailable = async () => {
    await this.doRates();
    const RRInc =
      (this.state.before_rate - this.state.increase) /
      (1 + this.state.increase);

    await this.setState({ loading: true, RRInc: RRInc });

    const fv_lump =
      FV(this.state.inflation, this.state.years_to, 0, this.state.cap_lump, 0) *
      -1;

    const pv_cont =
      PV(RRInc, this.state.years_to, this.state.cap_month, 0, 1) * -1;

    const fv_cont =
      FV(this.state.before_rate, this.state.years_to, 0, pv_cont, 0) * -1;

    // console.log("RR Inc "+RRInc+" Monthly amount: "+this.state.cap_month);

    const total = (fv_lump + fv_cont).toFixed(2);

    const shortfall = (total - this.state.fv_capitalNeed).toFixed(2);

    await this.setState({
      loading: false,
      cap_available: total,
      shortfall: shortfall,
    });

    await this.doShortFall();
  };

  doShortFall = async () => {
    await this.setState({ loading: true });

    if (this.state.shortfall < 0) {
      const lump_sum =
        PV(
          this.state.before_rate,
          this.state.years_to,
          0,
          this.state.shortfall * -1,
          0
        ).toFixed(2) * -1;

      const level =
        PMT(
          this.state.before_rate,
          this.state.years_to,
          0,
          this.state.shortfall * -1,
          0
        ).toFixed(2) * -1;

      const esc =
        PMT(
          (this.state.before_rate - 0.1) / 1.1,
          this.state.years_to,
          lump_sum,
          0,
          1
        ).toFixed(2) * -1;

      await this.setState({
        loading: false,
        add_lump: lump_sum,
        add_month: level,
        add_month_inc: esc,
      });
    } else {
      await this.setState({
        loading: false,
        add_lump: 0,
        add_month: 0,
        add_month_inc: 0,
      });
    }
  };

  doUpdate = async () => {
    await this.doRates();
    await this.doRequired();
    await this.doAvailable();
  };

  render() {
    return (
      <div>
        <br />

        <Typography variant="h4" align="left" color="primary">
          {this.details[this.state.activeStep].name} {this.state.activeStep} / 7
          {this.state.loading ? (
            <CircularProgress sx={{ float: "right" }} />
          ) : null}
        </Typography>

        <Paper>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 2 },
            }}
            noValidate
            autoComplete="off"
            m={2}
            pt={2}
          >
            <Typography variant="h6" align="left">
              {this.details[this.state.activeStep].desc}
            </Typography>

            {this.state.activeStep == 1 ? this.pageOne() : null}
            {this.state.activeStep == 2 ? this.pageTwo() : null}
            {this.state.activeStep == 3 ? this.pageThree() : null}
            {this.state.activeStep == 4 ? this.pageFour() : null}
            {this.state.activeStep == 5 ? this.pageFive() : null}
            {this.state.activeStep == 6 ? this.pageSix() : null}
            {this.state.activeStep == 7 ? this.pageSeven() : null}
          </Box>
        </Paper>
        <MobileStepper
          variant="progress"
          steps={8}
          position="static"
          activeStep={this.state.activeStep}
          sx={{ flexGrow: 1 }}
          nextButton={
            <Button
              size="large"
              onClick={() => {
                this.handleNext();
              }}
              disabled={this.state.activeStep === 7}
            >
              Next
              <KeyboardArrowRight />
            </Button>
          }
          backButton={
            <Button
              size="large"
              onClick={() => {
                this.handleBack();
              }}
              disabled={this.state.activeStep === 1}
            >
              <KeyboardArrowLeft />
              Back
            </Button>
          }
        />
      </div>
    );
  }

  pageOne = () => {
    return (
      <Box>
        <TextField
          margin="normal"
          label="Your name"
          variant="outlined"
          type="text"
          style={{ padding: 4 }}
        />
        <TextField
          margin="normal"
          label="Your email"
          variant="outlined"
          type="email"
          style={{ padding: 4 }}
        />

        <br />

        <TextField
          type="number"
          margin="normal"
          label="Age"
          type="number"
          defaultValue={25}
          style={{ width: 100 }}
          variant="outlined"
          style={{ padding: 4 }}
          onChange={(event) => {
            this.setState({ age: event.target.value });
          }}
        />

        <TextField
          margin="normal"
          label="Retirement Age"
          defaultValue={55}
          variant="outlined"
          type="number"
          style={{ padding: 4 }}
          onChange={(event) => {
            this.setState({ ret_age: event.target.value });
          }}
        />
        <br />
        <TextField
          margin="normal"
          label="Planning Age"
          defaultValue={100}
          variant="outlined"
          type="number"
          style={{ padding: 4 }}
          onChange={(event) => {
            this.setState({ plan_age: event.target.value });
          }}
        />
        <br />
        <br />
      </Box>
    );
  };

  pageTwo = () => {
    return (
      <div>
        <div>
          <Alert severity="info">
            <AlertTitle>Info</AlertTitle>
            The growth rates are the expected returns you hope to achieve on
            your portfolios. Riskier portfolios are expected to achieve better
            returns over the long term, but carry more risk. Portfolio selection
            should be suitable to amongst others your risk profile and
            investments goals.
          </Alert>

          <br />

          <Typography variant="OVERLINE" color="primary" align="left">
            Before your retirement
          </Typography>

          <div>
            {" "}
            <Chart
              width={400}
              height={120}
              chartType="Gauge"
              loader={<div>Loading Chart</div>}
              data={[
                ["Label", "Value"],
                ["Risk Rating", this.state.before_strat],
              ]}
              options={{
                redFrom: 90,
                redTo: 100,
                yellowFrom: 75,
                yellowTo: 90,
                minorTicks: 5,
              }}
            />
          </div>

          <br />
          <TextField
            id="before"
            select
            label="Select"
            value={this.state.before_strat}
            onChange={(e, { value }) => {
              this.setState({ before_strat: e.target.value });
            }}
            helperText="Please select your strategy"
          >
            {strategies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <br />
          <br />

          <Typography variant="OVERLINE" color="primary" align="left">
            After your retirement
          </Typography>

          <Chart
            width={400}
            height={120}
            chartType="Gauge"
            loader={<div>Loading Chart</div>}
            data={[
              ["Label", "Value"],
              ["Risk Rating", this.state.after_strat],
            ]}
            options={{
              redFrom: 90,
              redTo: 100,
              yellowFrom: 75,
              yellowTo: 90,
              minorTicks: 5,
            }}
          />

          <br />
          <TextField
            id="after"
            select
            label="Select"
            value={this.state.after_strat}
            onChange={(e, { value }) => {
              this.setState({ after_strat: e.target.value });
            }}
            helperText="Please select your strategy"
          >
            {strategies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <br />
          <br />
        </div>{" "}
      </div>
    );
  };

  pageThree = () => {
    return (
      <div>
        <Alert severity="info">
          <AlertTitle>Info</AlertTitle>
          Fees are something that you as an investor can control. Simply put
          lower fees = higher returns.
        </Alert>

        <br />

        <Stack direction="row" spacing={1} alignItems="center">
          <Typography>Outdated costs</Typography>
          <Switch
            onChange={async (event) => {
              console.log("Switch 5: " + event.target.checked);
              await this.setState({ fee: event.target.checked });
            }}
          />
          <Typography>Modern costs (Honest)</Typography>
        </Stack>

        <br />
      </div>
    );
  };

  pageFour = () => {
    return (
      <div>
        <Alert severity="info">
          <AlertTitle>Info</AlertTitle>
          Capital required. This is the amount of income and capital lumpsums
          that you would require on your retirement.
        </Alert>

        <br />

        <Box>
          <Typography variant="OVERLINE" align="left">
            #1 Monthly income need
          </Typography>
          <br />

          <Typography variant="caption" align="left">
            The monthly income amount [before Tax] you want at retirement in
            Today's Rand [PV]:
          </Typography>
          <br />
          <TextField
            margin="normal"
            label="Monthly income"
            variant="outlined"
            type="number"
            style={{ padding: 4 }}
            onChange={(event) => {
              this.setState({ pv_income: event.target.value });
              this.doRequired();
            }}
          />

          <br />

          <Typography variant="OVERLINE" align="left">
            #2 Capital need
          </Typography>
          <br />

          <Typography variant="caption" align="left">
            Total of all other lump sums required at retirement in Today's Rand
            [PV] i.e new car, or holiday:
          </Typography>
          <br />

          <TextField
            margin="normal"
            label="Lump sum"
            variant="outlined"
            style={{ padding: 4 }}
            onChange={(event) => {
              this.setState({ pv_capital: event.target.value });
              this.doRequired();
            }}
          />
          <br />
          <br />
          <Card
            sx={{ minWidth: 275 }}
            hidden={
              this.state.pv_capitalNeed != 0
                ? this.state.loading
                  ? true
                  : false
                : true
            }
          >
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Straight from the calculator
              </Typography>
              <Typography variant="h5" component="div">
                Your needs
              </Typography>
              <br />

              <Typography variant="body2">
                To provide you with a monthly income of{" "}
                <b>{PrintNice(this.state.pv_income)}</b> (that increases with
                inflation) and a capital amount of{" "}
                <b>{PrintNice(this.state.pv_capital)}</b> at your retirement.
                <br />
                You will need to have saved a total of{" "}
                <b>{PrintNice(this.state.fv_capitalNeed)}</b> when you retire.
                That is the same as having{" "}
                <b> {PrintNice(this.state.pv_capitalNeed)} </b>today.
              </Typography>
            </CardContent>
          </Card>
        </Box>

        <br />
      </div>
    );
  };

  pageFive = () => {
    return (
      <div>
        <Alert severity="info">
          <AlertTitle>Info</AlertTitle>
          Capital available. This is the current amounts that you have available
          and are currently contributing for retirement purposes.
        </Alert>

        <br />

        <Box>
          <Typography variant="OVERLINE" align="left">
            #1 Monthly contributions
          </Typography>
          <br />

          <Typography variant="caption" align="left">
            Your current total monthly contributions for retirement purposes:
          </Typography>
          <br />

          <TextField
            margin="normal"
            label="Monthly income"
            variant="outlined"
            type="number"
            style={{ padding: 4 }}
            onChange={async (event) => {
              await this.setState({ cap_month: event.target.value });
              this.doAvailable();
            }}
          />

          <br />

          <br />

          <TextField
            id="increase"
            select
            label="Select"
            value={this.state.increase}
            onChange={async (e, { value }) => {
              await this.setState({ increase: e.target.value });
              this.doAvailable();
            }}
            helperText="Select your annual increase"
          >
            {increase.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <br />
          <br />

          <Typography variant="OVERLINE" align="left">
            #2 Capital lump sums
          </Typography>
          <br />

          <Typography variant="caption" align="left">
            Total available lump sums [for retirement purposes]:
          </Typography>
          <br />
          <TextField
            margin="normal"
            label="Lump sum"
            variant="outlined"
            type="number"
            style={{ padding: 4 }}
            onChange={async (event) => {
              await this.setState({ cap_lump: event.target.value });
              this.doAvailable();
            }}
          />
          <br />
          <br />

          <Card
            sx={{ minWidth: 275 }}
            hidden={
              this.state.cap_available != 0
                ? this.state.loading
                  ? true
                  : false
                : true
            }
          >
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Straight from the calculator
              </Typography>
              <Typography variant="h5" component="div">
                Your Investments
              </Typography>
              <br />

              <Typography variant="body2">
                If you continue with your current investment strategy you should
                have
                <b> {PrintNice(this.state.cap_available)}</b> available on your
                retirement of age {this.state.ret_age}.
              </Typography>
            </CardContent>
          </Card>
        </Box>

        <br />
      </div>
    );
  };

  pageSix = () => {
    return (
      <div>
        <Alert severity="info">
          <AlertTitle>Info</AlertTitle>
          Let's see if you should have enough capital available to fund your
          retirement needs.
        </Alert>

        <br />

        <Box sx={{ width: "50%" }}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableBody>
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": {
                      border: 0,
                      width: "20%",
                    },
                  }}
                >
                  <TableCell component="th" scope="row">
                    Capital available
                  </TableCell>
                  <TableCell align="right">
                    {PrintNice(this.state.cap_available)}
                  </TableCell>
                </TableRow>

                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    less: Capital needed
                  </TableCell>
                  <TableCell align="right">
                    {PrintNice(this.state.fv_capitalNeed)}
                  </TableCell>
                </TableRow>

                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <b> {this.state.shortfall < 0 ? "Shortfall" : "Surplus"}</b>
                  </TableCell>
                  <TableCell align="right">
                    <b>{PrintNice(this.state.shortfall)}</b>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        <br />

        {this.doGraph()}

        <br />

        <Collapse in={this.state.shortfall < 0 ? true : false}>
          <Alert severity="warning">
            <AlertTitle>Options</AlertTitle>
            It seems that your needs exceed your available capital.
            <br />
            To make up the shortfall and keeping all else equal you could:
            <ol>
              <li>
                Make an additional once off contribution of:
                <b>{PrintNice(this.state.add_lump)} </b>{" "}
              </li>
              <li>
                Make level monthly contributions of:
                <b> {PrintNice(this.state.add_month)}</b>
              </li>
              <li>
                Make 10% annual increasing, monthly contributions of:{" "}
                <b>{PrintNice(this.state.add_month_inc)}</b>
              </li>
            </ol>
          </Alert>
        </Collapse>

        <Collapse in={this.state.shortfall < 0 ? false : true}>
          <Alert severity="success">
            <AlertTitle>Options</AlertTitle>
            It seems that you should have enough capital to sustain your
            retirement years. Let's see how you can further optimise your
            planning by playing with the inputs.
          </Alert>
        </Collapse>

        <br />
        <br />
      </div>
    );
  };

  pageSeven = () => {
    return (
      <div>
        <Alert severity="info">
          <AlertTitle>Info</AlertTitle>
          Making small adjustments to the factors below could have a huge impact
          on your retirement. Play around with the combinations until you are
          satisfied with your strategy.
          <Box hidden={this.state.shortfall < 0 ? false : true}>
            {" "}
            To make up the shortfall and keeping all else equal you could:
            <ol>
              <li>
                Make an additional once off contribution of:
                <b>{PrintNice(this.state.add_lump)} </b>{" "}
              </li>
              <li>
                Make level monthly contributions of:
                <b> {PrintNice(this.state.add_month)}</b>
              </li>
              <li>
                Make 10% annual increasing, monthly contributions of:{" "}
                <b>{PrintNice(this.state.add_month_inc)}</b>
              </li>
            </ol>{" "}
          </Box>
        </Alert>

        <br />

        <Box>{this.doGraph()}</Box>

        <Box sx={{ width: "80%" }}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Property</TableCell>
                  <TableCell align="right">Increase</TableCell>
                  <TableCell align="right">Decrease</TableCell>
                  <TableCell align="right" sx={{ width: "30%" }}>
                    New value
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    Cost structure
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      color="success"
                      aria-label="increase"
                      onClick={async (event) => {
                        (await this.state.fee)
                          ? this.setState({ fee: false })
                          : this.setState({ fee: true });
                        await this.doUpdate();
                      }}
                    >
                      <AddCircleOutlineIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      color="warning"
                      aria-label="decrease"
                      onClick={async (event) => {
                        (await this.state.fee)
                          ? this.setState({ fee: false })
                          : this.setState({ fee: true });
                        await this.doUpdate();
                      }}
                    >
                      <RemoveCircleOutlineIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell align="right">
                    {this.state.fee ? "Modern Costs" : "Outdated Costs"}
                  </TableCell>
                </TableRow>

                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    Retirement Age
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      color="success"
                      aria-label="increase"
                      onClick={async (event) => {
                        if (this.state.ret_age < 100) {
                          this.setState({ ret_age: this.state.ret_age + 1 });
                        }

                        await this.doUpdate();
                      }}
                    >
                      <AddCircleOutlineIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      color="warning"
                      aria-label="decrease"
                      onClick={async (event) => {
                        if (this.state.ret_age > 1) {
                          this.setState({ ret_age: this.state.ret_age - 1 });
                        }

                        await this.doUpdate();
                      }}
                    >
                      <RemoveCircleOutlineIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell align="right">{this.state.ret_age}</TableCell>
                </TableRow>

                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    Planning Age
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      color="success"
                      aria-label="increase"
                      onClick={async (event) => {
                        if (this.state.plan_age < 100) {
                          this.setState({ plan_age: this.state.plan_age + 1 });
                        }

                        await this.doUpdate();
                      }}
                    >
                      <AddCircleOutlineIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      color="warning"
                      aria-label="decrease"
                      onClick={async (event) => {
                        if (this.state.plan_age > 1) {
                          this.setState({ plan_age: this.state.plan_age - 1 });
                        }

                        await this.doUpdate();
                      }}
                    >
                      <RemoveCircleOutlineIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell align="right">{this.state.plan_age}</TableCell>
                </TableRow>

                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    Strategy before retirement
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      color="success"
                      aria-label="increase"
                      onClick={async (event) => {
                        if (this.state.before_strat < 100) {
                          this.setState({
                            before_strat: this.state.before_strat + 20,
                          });
                        }

                        await this.doUpdate();
                      }}
                    >
                      <AddCircleOutlineIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      color="warning"
                      aria-label="decrease"
                      onClick={async (event) => {
                        if (this.state.before_strat >= 20) {
                          this.setState({
                            before_strat: this.state.before_strat - 20,
                          });
                        }

                        await this.doUpdate();
                      }}
                    >
                      <RemoveCircleOutlineIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell align="right">
                    {this.typeFund(this.state.before_strat)}
                  </TableCell>
                </TableRow>

                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    Strategy after retirement
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      color="success"
                      aria-label="increase"
                      onClick={async (event) => {
                        if (this.state.after_strat < 100) {
                          this.setState({
                            after_strat: this.state.after_strat + 20,
                          });
                        }

                        await this.doUpdate();
                      }}
                    >
                      <AddCircleOutlineIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      color="warning"
                      aria-label="decrease"
                      onClick={async (event) => {
                        if (this.state.after_strat >= 20) {
                          this.setState({
                            after_strat: this.state.after_strat - 20,
                          });
                        }

                        await this.doUpdate();
                      }}
                    >
                      <RemoveCircleOutlineIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell align="right">
                    {this.typeFund(this.state.after_strat)}
                  </TableCell>
                </TableRow>

                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    Monthly Income requirement
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      color="success"
                      aria-label="increase"
                      onClick={async (event) => {
                        if (this.state.pv_income < 1000000) {
                          this.setState({
                            pv_income: this.state.pv_income + 1000,
                          });
                        }

                        await this.doUpdate();
                      }}
                    >
                      <AddCircleOutlineIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      color="warning"
                      aria-label="decrease"
                      onClick={async (event) => {
                        if (this.state.pv_income > 1000) {
                          this.setState({
                            pv_income: this.state.pv_income - 1000,
                          });
                        }

                        await this.doUpdate();
                      }}
                    >
                      <RemoveCircleOutlineIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell align="right">
                    {PrintNice(this.state.pv_income)}
                  </TableCell>
                </TableRow>

                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    Capital requirement
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      color="success"
                      aria-label="increase"
                      onClick={async (event) => {
                        if (this.state.pv_capital < 1000000) {
                          this.setState({
                            pv_capital: this.state.pv_capital + 1000,
                          });
                        }

                        await this.doUpdate();
                      }}
                    >
                      <AddCircleOutlineIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      color="warning"
                      aria-label="decrease"
                      onClick={async (event) => {
                        if (this.state.pv_capital > 1000) {
                          this.setState({
                            pv_capital: this.state.pv_capital - 1000,
                          });
                        }

                        await this.doUpdate();
                      }}
                    >
                      <RemoveCircleOutlineIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell align="right">
                    {PrintNice(this.state.pv_capital)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <br />
          <Button variant="contained">Save plan</Button>{" "}
          <Button variant="contained">Implement plan</Button>
        </Box>

        <br />
      </div>
    );
  };

  doGraph = () => {
    return (
      <box>
        <Chart
          width={"500px"}
          height={"300px"}
          chartType="BarChart"
          loader={<div>Loading Chart</div>}
          data={[
            [
              "Element",
              "Projected value",
              { role: "style" },
              {
                sourceColumn: 0,
                role: "annotation",
                type: "string",
                calc: "stringify",
              },
            ],
            ["Available", parseFloat(this.state.cap_available), "blue", null],
            ["Needed", parseFloat(this.state.fv_capitalNeed), "green", null],
            [
              this.state.shortfall < 0 ? "Shortfall" : "Surplus",
              parseFloat(this.state.shortfall),
              this.state.shortfall < 0 ? "red" : "orange",
              null,
            ],
          ]}
          options={{
            title: "Retirement forecast",
            width: "90%",
            height: 300,
            bar: { groupWidth: "95%" },
            legend: { position: "none" },
          }}
          // For tests
          rootProps={{ "data-testid": "6" }}
        />
      </box>
    );
  };

  typeFund = (val) => {
    switch (val) {
      case 0:
        return <p>{strategies[0].label}</p>;
      case 20:
        return <p>{strategies[1].label}</p>;
      case 40:
        return <p>{strategies[2].label}</p>;
      case 60:
        return <p>{strategies[3].label}</p>;
      case 80:
        return <p>{strategies[4].label}</p>;
      case 100:
        return <p>{strategies[5].label}</p>;
    }
  };
}

export default Calculator;
